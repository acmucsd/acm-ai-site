import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from '../../components/layouts/default';
import { Form, Button, Upload, message } from 'antd';
import { useForm } from 'react-hook-form';
import Card from '../../components/Card';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { uploadNN } from '../../actions/nn';
import UserContext from '../../UserContext';
import path from 'path';
import BackLink from '../../components/BackLink';

const UploadNNPage = () => {
  const { handleSubmit } = useForm();
  const [nnFile, setFile] = useState<any>();
  const { user } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    !user.loggedIn &&
      message.info('You need to login to upload predictions and participate') &&
      history.replace(path.join(window.location.pathname, '../../../login'));
  }, []);

  const onSubmit = () => {
    uploadNN(nnFile, user.username as string).then((res) => {
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
      <div className="UploadNNPage">
        <br />
        <BackLink to="../" />
        <Card className="upload-form-card">
          <h2>Submit Predictions</h2>
          <p>
            You must submit a csv file that contains your predictions. There
            should be 1000 rows and there is no header
          </p>
          <br />
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="upload-wrapper">
                <Upload
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  <Button className="upload-nn">
                    <UploadOutlined /> Click to add .csv file
                  </Button>
                </Upload>
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

export default UploadNNPage;
