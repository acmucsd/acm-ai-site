import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Form, Input, Button, Upload, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Card from '../../components/Card';
import { useParams, useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import TournamentContext from '../../contexts/tournament';
import { uploadNN } from '../../actions/dimensions/tournament';
import UserContext, { COMPETITION_NAMES } from '../../UserContext';
import path from 'path';


function UploadNNPage({competitionKey}: {competitionKey: COMPETITION_NAMES}) {
  const { handleSubmit, control} = useForm();
  const [nnFile, setFile] = useState<any>();
  const { tournament } = useContext(TournamentContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    // TODO: Uncomment following line
    // !user.loggedIn && message.info('You need to login to upload a bot') && history.replace(path.join(window.location.pathname, '../../../login'));
    
  }, []);
  useEffect(() => {
    if (user.competitionRegistrations[competitionKey] !== undefined)  {
      !user.competitionRegistrations[competitionKey] && message.info("You need to register into the competition to submit a neural network") && history.replace(path.join(window.location.pathname, '../'));
    }
  }, [user]);
  const onSubmit = (values: any) => {
    console.log(values)
    // TODO: remove hardcoded competition specific names
    //tournament.dimID/id "cannot read property dimID of undefined"
    // TODO: create neural network upload function
    const tempdimID = "neural-network-v1";
    const tempID = "neural-network";
    uploadNN(tempdimID, tempID, nnFile, user.competitionData[competitionKey]?.id as string).then(() => {
      message.success('Succesfully uploaded bot');
    });
  }
  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  
  const handleFileChange = (info: any) => {
    if (info.file.status === 'uploading') {
      // setLoading('loading');
    }
    if (info.file.status !== 'uploading') {

    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file added successfully`);
      
      let file: any = info.file;
      setFile(file.originFileObj);
    }
  }
  return (
    <DefaultLayout>
      <div className='UploadNNPage'>
        <Card className='upload-form-card'>
          <h2>Submit NN</h2>
          <p>You must submit a zip file that contains all your neural network code and the main file in the root folder</p>
          <br />
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='upload-wrapper'>
                <Upload
                  
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  <Button className="upload-nn">
                    <UploadOutlined /> Click to add neural network zip file
                  </Button>
                </Upload>
              </div>
              <Button htmlType="submit" className='submit-button'>Submit Neural Network</Button>
            </form>
          </Form>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default UploadNNPage
