import React, { useEffect, useState, useContext } from 'react';
import './index.less';
import DefaultLayout from "../../components/layouts/default";
import { Form, Input, Button, Upload, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import Card from '../../components/Card';
import { useHistory } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import TournamentContext from '../../contexts/tournament';
import { uploadBot } from '../../actions/dimensions/tournament';
import UserContext, { COMPETITION_NAMES } from '../../UserContext';
import path from 'path';


type UploadBotPageProps = {
  competitionKey: COMPETITION_NAMES;
}
export const UploadBotPage = ({competitionKey}: UploadBotPageProps) => {
  const { handleSubmit, control} = useForm();
  const [botFile, setFile] = useState<any>();
  const { tournament } = useContext(TournamentContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    !user.loggedIn && message.info('You need to login to upload a bot') && history.replace(path.join(window.location.pathname, '../../../login'));
    
  }, []);
  useEffect(() => {
    if (user.competitionRegistrations[competitionKey] !== undefined)  {
      !user.competitionRegistrations[competitionKey] && message.info("You need to register into the competition to upload a bot") && history.replace(path.join(window.location.pathname, '../'));
    }
  }, [user]);
  const onSubmit = (values: any) => {
    // TODO: remove hardcoded competition specific names
    uploadBot(tournament.dimID, tournament.id, values.botname, botFile, user.competitionData[competitionKey]?.id as string, values.path).then(() => {
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
      <div className='UploadBotPage'>
        <Card className='upload-form-card'>
          <h2>Submit Bot</h2>
          <p>You must submit a zip file that contains all your bot code and the main file in the root folder</p>
          <br />
          <Form>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller 
                as={
                  <Form.Item>
                    <Input
                      type='text'
                      placeholder='Bot Name'
                      name='botname'
                    />
                  </Form.Item>
                }
                control={control}
                rules={{ required: true }}
                name='botname'
              />
              <div className='upload-wrapper'>
                <Upload
                  
                  onChange={handleFileChange}
                  customRequest={dummyRequest}
                >
                  <Button className="upload-bot">
                    <UploadOutlined /> Click to add bot zip file
                  </Button>
                </Upload>
              </div>
              <Controller 
                as={
                  <Form.Item>
                    <Input
                      type='text'
                      placeholder='Bot Path'
                      name='path'
                    />
                  </Form.Item>
                }
                control={control}
                rules={{ required: true }}
                name='path'
              />
              <Button htmlType="submit" className='submit-button'>Submit Bot</Button>
            </form>
          </Form>
        </Card>
      </div>
    </DefaultLayout>
  );
}

export default UploadBotPage
