import React, { useState } from 'react';
import './index.less';
import DefaultLayout from '../../../components/layouts/default';
import { Form, Input, message, Button, Checkbox, Layout } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../../actions/auth';
import { useHistory, Link, useLocation } from 'react-router-dom';

const { Content } = Layout;

function RegisterPage() {

  const location = useLocation();
  const isAdmin  = location.pathname === '/admin/register';

  const history = useHistory();
  const { handleSubmit, watch, control, formState: { errors } } = useForm();
  const [checked, setChecked] = useState(true);
  const onSubmit = (values: any) => {
    if (errors.confirmPassword) {
      handlePasswordErrors(errors);
    }
    registerUser({ ...values, isUCSD: checked, admin: isAdmin }).then((res) => {
      message.success('Please check your email to verify your account');
      message.success(isAdmin ? 
        'Admin registered! Redirecting to login page' : 
        'Registered! Redirecting to login page');
      history.push('/verify/?id=' + res.id);
    });
  };
  const onCheckChange = (e: any) => {
    setChecked(e.target.checked);
  };

  return (
    <DefaultLayout>
      <div className="RegisterPage">
        <Content className="registerDetails">
          <div className="registerHeader">
            {
              isAdmin ? <h2>Register as Admin</h2> : 
              (<>
                <h2>Register</h2>
                <p>
                An ACM AI account will help you get the most out of our events and
                opportunities whether it be for awesome competitions or cool
                networking events!
                </p>
              </>
              )
            }
          </div>

          <Form onSubmitCapture={handleSubmit(onSubmit)}>
            <Controller
              render={({ field }) => (
                <Form.Item hasFeedback style={{ marginBottom: '12px' }}>
                  <Input
                    {...field}
                    size="large"
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
                  <Input
                    {...field}
                    size="large"
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                  />
                </Form.Item>
              )}
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address',
                },
              }}
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
                  />
                </Form.Item>
              )}
              name="password"
              control={control}
              rules={{ required: true, minLength: 6 }}
            />
            <Controller
              render={({ field }) => ( 
                <Form.Item style={{ marginBottom: '12px' }}>
                  <Input.Password
                    {...field}
                    size="large"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                  />
                </Form.Item>
              )}
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                validate: (value) => watch('password') === value,
              }}
            />
            { !isAdmin ? <></>: <Controller
              render={({ field }) => ( 
                <Form.Item>
                  <Checkbox {...field} value={checked} onChange={onCheckChange}>
                    <p>From UCSD</p>
                  </Checkbox>
                </Form.Item> 
              )}
              name="isUCSD"
              control={control}
            />}

            <div className="errorBox">
              {errors.username && <p className="danger">Missing username</p>}
              {errors.email &&
                ((errors.email.type === 'required' && (
                  <p className="danger">Missing email</p>
                )) ||
                  (errors.email.type === 'pattern' && (
                    <p className="danger">Email is invalid</p>
                  )))}
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
            </div>

            <Button htmlType="submit" size="large" id="registerButton">
              <p>Register</p>
            </Button>
          </Form>

          <div className="loginLink">
            <Link to='./login'>
            <p>Already have an account? Log in</p>
            </Link>
          </div>

        </Content>
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
export default RegisterPage;
