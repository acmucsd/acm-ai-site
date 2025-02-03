import React from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Input, message, Button, Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { verifyEmail } from '../../../actions/auth';
const { Content } = Layout;

const VerifyEmailPage = () => {
  const { handleSubmit, control } = useForm();
  const history = useHistory();

  const onSubmit = (values: any) => {
    console.log(values.code);

    verifyEmail(values.code).then((res) => {
      message.success('Email Verified! Redirecting to login page');
      history.push('/login'); // Redirect to login page
    });
  };

  return (
    <DefaultLayout>
      <div className="VerifyEmailPage">
        <Content className="VerifyDetails">
          <div className="VerifyHeader">
            <h2>Verify Email</h2>
            <h4>Enter the verification code sent to your email</h4>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              as={
                <Form.Item>
                  <Input
                    size="large"
                    autoComplete="off"
                    type="text"
                    placeholder="Verification Code"
                    name="code"
                  />
                </Form.Item>
              }
              name="code"
              control={control}
              rules={{ required: true }}
            />

            <Button htmlType="submit" size="large" id="VerifyButton">
              <p>Verify</p>
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

export default VerifyEmailPage;


