import React, { useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Input, message, Button, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, getUserFromToken } from '../../../actions/auth';
import { Link } from 'react-router-dom';
import UserContext from '../../../UserContext';
import { DIMENSION_ID } from '../../../configs';
const { Content } = Layout;

function LoginPage() {
  let { setUser } = useContext(UserContext);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = (values: any) => {
    // update step
    // setRegisterStep('processing');

    loginUser(DIMENSION_ID, values).then((res: any) => {
      setUser(getUserFromToken(res));
      message.success('Logged in!');
      window.location.href = '/profile';
    });
  };

  return (
    <DefaultLayout>
      <div className="LoginPage">
        <Content className="loginDetails">
          <Form onSubmitCapture={handleSubmit(onSubmit)}>
            <div className="loginHeader">
              <h2>Login</h2>
              <p>Log back into your account!</p>
            </div>

            <Controller
              render={({ field }) => (
                <Form.Item style={{ marginBottom: '12px' }}>
                  <Input
                    {...field}
                    size="large"
                    allowClear={true}
                    type="text"
                    placeholder="Username"
                    name="username"
                    autoComplete="off"
                  />
                </Form.Item>
              )}
              control={control}
              rules={{ required: true }}
              name="username"
            />
            <Controller
              render={({ field }) => (
                <Form.Item style={{ marginBottom: '12px' }}>
                  <Input.Password
                    {...field}
                    size="large"
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                  />
                </Form.Item>
              )}
              name="password"
              control={control}
              rules={{ required: true }}
            />

            {errors.username && <p className="danger">Missing username</p>}
            {errors.password && errors.password.type === 'required' && (
              <p className="danger">Password is required</p>
            )}

            <Button htmlType="submit" size="large" id="loginButton">
              <p>Login</p>
            </Button>

            <div className="authOptionsBox">
              <Link to="./register">
                <p className="option">New here? Register an account</p>
              </Link>
              <Link to="./requestreset">
                <p className="option">Forgot password?</p>
              </Link>
            </div>
          </Form>
        </Content>
      </div>
    </DefaultLayout>
  );
}
export default LoginPage;
