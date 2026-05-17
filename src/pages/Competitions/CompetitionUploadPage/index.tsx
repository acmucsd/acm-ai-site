import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Button, Upload, message, Input } from 'antd';
import { useForm } from 'react-hook-form';
// import Card from '../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadSubmission, getSubmissionFileName } from '../../../actions/competition';
import UserContext from '../../../UserContext';
import { minimatch } from 'minimatch';
import path from 'path';
import BackLink from '../../../components/BackLink';
// import CheckableTagList from '../../../components/CheckableTagList'
import { Tag, Tooltip } from 'antd';

const { TextArea } = Input;
const MAX_UPLOAD_SIZE_BYTES = 80 * 1024 * 1024;

const CompetitionUploadPage = () => {
  // const tags = ['feather weight', 'middle weight', 'heavy weight']
  // const [tagsChecked, setTagsChecked] = useState<boolean[]>(Array(tags.length).fill(false))

  const [desc, setDesc] = useState<string>('');

  const { handleSubmit } = useForm();
  const [submissionFile, setFile] = useState<any>();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams() as { id: string };
  const competitionID = id;

  const [submissionFilePattern, setSubmissionFilePattern] = useState<string>('');
  const [tags, setTags] = useState<Array<string>>([]);
  const [inputVisible, setInputVisible] = useState<Boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  // Remove tags from list
  const handleClose = (removedTag: any) => {
    const newTags: any = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  // Show input box when adding new tag
  const showInput = () => {
    setInputVisible(true);
  };

  // Set input value on change
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  // Submit new tag on enter key press
  const handleInputConfirm = () => {
    let newTags: Array<string> = [];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }

    // Limit of 10 tags
    if (newTags.length > 10) {
      message.info('Up to 10 tags may be submitted');
    } else {
      setTags(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  useEffect(() => {
    if (competitionID) {
      getSubmissionFileName(competitionID)
        .then((data: any) => {
          setSubmissionFilePattern(data.submissionFileName || '');
        })
        .catch((error) => {
          message.error(`Failed to load submission file name pattern for ${competitionID}.`);
          console.error('Error loading competition submission file name:', error);
          setSubmissionFilePattern('');
        });
    }
  }, [competitionID]);

  useEffect(() => {
    if (!user.loggedIn) {
      message.info('You need to login to upload submissions and participate');
      history.replace(path.join(window.location.pathname, '../../../login'));
    }
  }, []);

  const onSubmit = () => {
    setUploading(true);
    uploadSubmission(
      submissionFile,
      tags,
      desc,
      competitionID,
      user.username as string
    )
      .then((res) => {
        message.success('Submission Uploaded Succesfully');
        localStorage.setItem("activeTab", JSON.stringify('3'));
        history.replace('/portal');
      })
      .catch((err) => {
        console.log(err);
        message.error(`${err}`);
      })
      .finally(() => {
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

  const beforeUpload = (file: any) => {
    const isZipFile = file.name.toLowerCase().endsWith('.zip');
    if (!isZipFile) {
      message.error('You can only upload ZIP files!');
      return false;
    }

    const isWithinSizeLimit = file.size <= MAX_UPLOAD_SIZE_BYTES;
    if (!isWithinSizeLimit) {
      message.error(`File must be ${MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)}MB or smaller.`);
      return false;
    }

    if (submissionFilePattern) {
      if (!minimatch(file.name, submissionFilePattern)) {
        message.error(`"${file.name}" does not match the required file name pattern: ${submissionFilePattern}`);
        return false;
      }
    }

    return true;
  };

  return (
    <DefaultLayout>
      <div className="CompetitionUploadPage">
        <br />
        <BackLink to="../" />
        <h2>Submission to {competitionID}</h2>
        <p>
          You must submit a .zip file{submissionFilePattern ? ` matching the pattern: ${submissionFilePattern}` : ''} that contains your submission.
        </p>
        <br />
        {/* <Form> */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div className="upload-wrapper">
              {/* <TextArea
                className="desc"
                rows={2}
                value={desc}
                onChange={(evt) => setDesc(evt.target.value)}
              /> */}
              <Upload onChange={handleFileChange} 
                      customRequest={dummyRequest} 
                      beforeUpload={beforeUpload}
                      accept=".zip,application/zip,application/x-zip-compressed"
              >
                <Button className="upload-btn">
                  <UploadOutlined /> Click to add file
                </Button>
              </Upload>
              {/* <div className="tags-list">
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable={index !== 0}
                      onClose={() => handleClose(tag)}
                    >
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
                  <Tag
                    onClick={showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                  >
                    Add tag
                  </Tag>
                )}
              </div> */}
            </div>
            <Button
              htmlType="submit"
              className="submit-button"
              onClick={handleSubmit(onSubmit)}
              disabled={uploading}
            >
              {uploading ? "Running benchmark" : "Submit"}
            </Button>
          {/* </form> */}
        {/* </Form> */}
      </div>
    </DefaultLayout>
  );
};

export default CompetitionUploadPage;
