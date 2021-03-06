import React from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import Card from '../../../components/Card';
import { Form, Input, message, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { resetPassword } from '../../../actions/auth';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import query from 'querystring';

function ForgotPasswordPage({ location }: RouteComponentProps) {
  const history = useHistory();
  const { handleSubmit, watch, errors, control } = useForm();
  const onSubmit = (values: any) => {
    let queries = query.parse(location.search);

    let body = {
      username: String(queries['username']),
      code: String(queries['?code']),
      password: values['password'],
    };

    if (errors.confirmPassword) {
      handlePasswordErrors(errors);
    }
    resetPassword(body).then(() => {
      message.success('Password Changed! Redirecting to login page');
      history.push('/login');
    });
  };
  return (
    <DefaultLayout>
      <div className="RegisterPage">
        <Card className="registerCard">
          <div className="cardContent">
            <h2 style={{ margin: 0 }}>Forgot Password?</h2>
            <p>Enter your new password</p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
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
                rules={{ required: true, minLength: 6 }}
              />
              <Controller
                as={
                  <Form.Item>
                    <Input.Password
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                    />
                  </Form.Item>
                }
                name="confirmPassword"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => watch('password') === value,
                }}
              />

              {errors.password &&
                ((errors.password.type === 'minLength' && (
                  <p className="danger">Password is not long enough</p>
                )) ||
                  (errors.password.type === 'required' && (
                    <p className="danger">Password is required</p>
                  )))}
              {errors.confirmPassword?.type === 'required' && (
                <p className="danger">Need to confirm password</p>
              )}
              {errors.confirmPassword?.type === 'validate' && (
                <p className="danger">Passwords need to match</p>
              )}
              <Button htmlType="submit" className="registerButton">
                Reset
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DefaultLayout>
  );
}
function handlePasswordErrors(errors: any) {
  if (errors.confirmPassword) {
    switch (errors.confirmPassword.type) {
      case 'required': {
        message.error('Please confirm your password');
        break;
      }
      case 'validate': {
        message.error("Passwords don't match");
        break;
      }
    }
  }
}
export default ForgotPasswordPage;
