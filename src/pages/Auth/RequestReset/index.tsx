import React from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import Card from '../../../components/Card';
import { Form, Input, message, Button, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { requestReset } from '../../../actions/auth';
const { Content } = Layout;

const RequestResetPage = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (values: any) => {
    requestReset(values.username).then((res) => {
      message.success('Reset Link Sent! Check your email');
    });
  };
  return (
    <DefaultLayout>
      <div className="RequestResetPage">
        
        <Content className="requestDetails">

          <div className="requestHeader">
            <h2>Forgot Password?</h2>
            <p>Enter your username and we'll send you an email to reset your password</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Item>
                  <Input type="text" placeholder="Username" name="username" />
                </Form.Item>
              }
              name="username"
              control={control}
              rules={{ required: true }}
            />

    

            <Button htmlType="submit" className="requestButton">
              <h4>Send Reset Link</h4>
            </Button>
          </form>

        </Content>

      </div>
    </DefaultLayout>
  );
};

export default RequestResetPage;

/*
<Card className="registerCard">
  <div className="cardContent">
    <h2 style={{ margin: 0 }}>Forgot Password?</h2>
    <p>Enter your username</p>
    <br />
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={
          <Form.Item>
            <Input type="text" placeholder="Username" name="username" />
          </Form.Item>
        }
        name="username"
        control={control}
        rules={{ required: true }}
      />

      <Button htmlType="submit" className="registerButton">
        Request Reset Link
      </Button>
    </form>
  </div>
</Card>
*/