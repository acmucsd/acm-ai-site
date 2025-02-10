import React, { useEffect, useState } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Input, message, Button, Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { verifyEmail } from '../../../actions/auth';
import query from 'querystring';

const { Content } = Layout;

const VerifyEmailPage = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const history = useHistory();
  

  const onSubmit = (values: any) => {
    console.log(values.code);

    let queries = query.parse(window.location.search);

    let body = {
      code: values.code,
      id: String(queries['id']),
    };

    verifyEmail(body).then((res) => {
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
              render={({ field }) => (
                <Form.Item style={{ marginBottom: '12px' }}>
                  <Input
                    {...field} // Ensure field props are spread
                    size="large"
                    autoComplete="off"
                    type="text"
                    placeholder="Verification Code"
                    name="code"
                    allowClear={true}
                  />
                </Form.Item>
              )}
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


