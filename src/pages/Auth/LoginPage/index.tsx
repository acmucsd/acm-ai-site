import React, { useContext } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import Card from '../../../components/Card';
import { Form, Input, message, Button, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, getUserFromToken } from '../../../actions/auth';
import { Link } from 'react-router-dom';
import UserContext from '../../../UserContext';
import { DIMENSION_ID } from '../../../configs';
const { Content } = Layout;


function LoginPage() {
  let { setUser } = useContext(UserContext);
  const { handleSubmit, errors, control } = useForm();
  const onSubmit = (values: any) => {
    // update step
    // setRegisterStep('processing');

    loginUser(DIMENSION_ID, values).then((res: any) => {
      setUser(getUserFromToken(res));
      message.success('Logged in!');
      window.location.href = '/';
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
              as={
                <Form.Item>
                  <Input
                    size="large"
                    allowClear={true}
                    type="text"
                    placeholder="Username"
                    name="username"
                  />
                </Form.Item>
              }
              control={control}
              rules={{ required: true }}
              name="username"
            />
            <Controller
              as={
                <Form.Item>
                  <Input.Password
                    size="large"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </Form.Item>
              }
              name="password"
              control={control}
              rules={{ required: true }}
            />

            {errors.username && <p className="danger">Missing username</p>}
            {errors.password && errors.password.type === 'required' && (
              <p className="danger">Password is required</p>
            )}


            <Button htmlType="submit" className="loginButton">
              <h4>Login</h4>
            </Button>

            <div className="authOptionsBox">
              <Link to="./register"><p className="option">New here? Register an account</p></Link>
              <Link to="./requestreset"><p className="option">Forgot password?</p></Link>
            </div>

          </Form>
        </Content>
      </div>
    </DefaultLayout>


  );
}
export default LoginPage;


/*
    <DefaultLayout>
      <div className="LoginPage">
        <Card className="loginCard">
          <div className="cardContent">
            <h2>Login</h2>
            <br />
            <Form onSubmitCapture={handleSubmit(onSubmit)}>
              <Controller
                as={
                  <Form.Item>
                    <Input type="text" placeholder="Username" name="username" />
                  </Form.Item>
                }
                control={control}
                rules={{ required: true }}
                name="username"
              />
              <Controller
                as={
                  <Form.Item>
                    <Input.Password
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </Form.Item>
                }
                name="password"
                control={control}
                rules={{ required: true }}
              />

              {errors.username && <p className="danger">Missing username</p>}
              {errors.password && errors.password.type === 'required' && (
                <p className="danger">Password is required</p>
              )}
              <Button htmlType="submit" className="loginButton">
                Login
              </Button>
            </Form>
            <div className="register-info">
              <Link to="./register">Or Register an Account here</Link>
            </div>
            <div className="register-info">
              <Link to="./requestreset">Forgot your password?</Link>
            </div>
          </div>
        </Card>
      </div>
    </DefaultLayout>
*/