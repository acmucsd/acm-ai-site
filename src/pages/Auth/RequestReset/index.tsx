import React from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Input, message, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { requestReset } from '../../../actions/auth';
const { Content } = Layout;

const RequestResetPage = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (values: any) => {
    console.log(values.username);

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
            <p>
              Enter your username and we'll send you an email to reset your
              password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Item>
                  <Input
                    size="large"
                    autoComplete="off"
                    type="text"
                    placeholder="Username"
                    name="username"
                  />
                </Form.Item>
              }
              name="username"
              control={control}
              rules={{ required: true }}
            />

            <Button
              htmlType="submit"
              size="large"
              style={{ background: 'black', height: '45px', border: 'none' }}
            >
              <h4 style={{ color: 'white' }}>Send Reset Link</h4>
            </Button>
          </form>

          <div className="loginLink">
            <Link to="./login">
              <p className="option">Back to Login</p>
            </Link>
          </div>
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
