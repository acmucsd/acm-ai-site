import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Button, Upload, message, Input } from 'antd';
import { useForm } from 'react-hook-form';
import Card from '../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadSubmission } from '../../../actions/competition';
import UserContext from '../../../UserContext';
import path from 'path';
import BackLink from '../../../components/BackLink';
import CheckableTagList from '../../../components/CheckableTagList'

const { TextArea } = Input;

const CompetitionUploadPage = () => {

  const tags = ['feather weight', 'middle weight', 'heavy weight']
  const [tagsChecked, setTagsChecked] = useState<boolean[]>(Array(tags.length).fill(false))

  const [desc, setDesc] = useState<string>('')

  const { handleSubmit } = useForm();
  const [submissionFile, setFile] = useState<any>();
  const { user } = useContext(UserContext);
  const history = useHistory();
  const {id} = useParams() as {id: string};
  const competitionID = id;

  useEffect(() => {
    !user.loggedIn &&
      message.info('You need to login to upload predictions and participate') &&
      history.replace(path.join(window.location.pathname, '../../../login'));
  }, []);

  const onSubmit = () => {

    let tagsSelected: string[] = []
    tagsChecked.map((checked: boolean, i: number) => {
      if (checked) tagsSelected.push(tags[i]) 
    })

    uploadSubmission(submissionFile, tagsSelected, desc, competitionID, user.username as string).then((res) => {
      message.success('Score: ' + res.data.score);
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
        <Card className="upload-form-card">
          <h2>Submit Predictions</h2>
          <p>
            You must submit a csv file that contains your predictions
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
                    <UploadOutlined /> Click to add .csv file
                  </Button>
                </Upload>
                <CheckableTagList
                  tags={tags}
                  tagsChecked={tagsChecked}
                  setTagsChecked={setTagsChecked}
                />
              </div>
              <Button htmlType="submit" className="submit-button">
                Submit Predictions
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default CompetitionUploadPage;
