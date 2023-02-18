import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Button, Upload, message, Input } from 'antd';
import { useForm } from 'react-hook-form';
// import Card from '../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { uploadSubmission } from '../../../actions/competition';
import UserContext from '../../../UserContext';
import path from 'path';
import BackLink from '../../../components/BackLink';
// import CheckableTagList from '../../../components/CheckableTagList'
import { Tag, Tooltip } from 'antd';

const { TextArea } = Input;

const CompetitionUploadPage = () => {

  // const tags = ['feather weight', 'middle weight', 'heavy weight']
  // const [tagsChecked, setTagsChecked] = useState<boolean[]>(Array(tags.length).fill(false))

  const [desc, setDesc] = useState<string>('')

  const { handleSubmit } = useForm();
  const [submissionFile, setFile] = useState<any>();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const {id} = useParams() as {id: string};
  const competitionID = id;

  const [tags, setTags] = useState<Array<string>>([])
  const [inputVisible, setInputVisible] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  // Remove tags from list
  const handleClose = (removedTag: any) => {
    const newTags: any = tags.filter(tag => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  // Show input box when adding new tag
  const showInput = () => {
    setInputVisible(true);
  };

  // Set input value on change
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  };

  // Submit new tag on enter key press
  const handleInputConfirm = () => {
    let newTags: Array<string> = []
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    console.log(newTags);

    // Limit of 10 tags
    if (newTags.length > 10) {
      message.info('Up to 10 tags may be submitted')
    }
    else {
      setTags(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  useEffect(() => {
    !user.loggedIn &&
      message.info('You need to login to upload predictions and participate') &&
      history.replace(path.join(window.location.pathname, '../../../login'));
  }, []);

  const onSubmit = () => {
    setUploading(true);
    uploadSubmission(submissionFile, tags, desc, competitionID, user.username as string).then((res) => {
      message.success('Submission Uploaded Succesfully');
      history.replace(path.join("/competitions", competitionID))
    }).catch((err) => {
      message.error(`${err}`);
    }).finally(() => {
      setUploading(false);
    });
  };
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleFileChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file added successfully`);

      let file: any = info.file;
      setFile(file.originFileObj);
    }
  };  

  return (
    <DefaultLayout>
      <div className="CompetitionUploadPage">
        <br />
        <BackLink to="../" />
        {/* <Card className="upload-form-card"> */}
          <h2>Submission to {competitionID}</h2>
          <p>
            You must submit a .tar.gz file that contains your submission. You can add an optional description below as well as tags.
          </p>
          <br />
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="upload-wrapper">
                <TextArea
                  className="desc"
                  rows={2}
                  value={desc}
                  onChange={(evt) => setDesc(evt.target.value)}
                />
                <Upload
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  <Button className="upload-btn">
                    <UploadOutlined /> Click to add file
                  </Button>
                </Upload>
                <div className='tags-list'>
                  {/* Truncate long tags */}
                  {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                  {inputVisible && (
                    <Input
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={handleInputConfirm}
                      onPressEnter={handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                      Add tag
                    </Tag>
                  )}
                </div>
              </div>
              <Button htmlType="submit" className="submit-button" disabled={uploading}>
                Submit Predictions
              </Button>
            </form>
          </Form>
        {/* </Card> */}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionUploadPage;