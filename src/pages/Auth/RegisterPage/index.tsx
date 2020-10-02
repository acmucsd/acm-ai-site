import React from 'react';
import './index.less';
import DefaultLayout from "../../../components/layouts/default";
import Card from '../../../components/Card';
import { Form, Input, message, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../../actions/auth';
import { useParams, useHistory, Link } from 'react-router-dom';
import { DIMENSION_ID } from '../../../configs';

function RegisterPage() {
  const params: any = useParams();
  const history = useHistory();
  const { handleSubmit, watch, errors, control } = useForm();
  const onSubmit = (values: any) => {
    if(errors.confirmPassword) {
      handlePasswordErrors(errors)
    }
  
    registerUser(DIMENSION_ID, values).then((res) => {
      message.success('Registered! Redirecting to login page');
      history.push('/login');
    });
  }
  return (
    <DefaultLayout>
      <div className='RegisterPage'>
        <Card className="registerCard">
          <div className="cardContent">
            <h2>Register</h2>
            <br />
            <Form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                  as={
                    <Form.Item hasFeedback>
                      <Input
                        type='text'
                        placeholder='Username'
                        name='username'
                      />
                    </Form.Item>
                  }
                  control={control}
                  rules={{ required: true }}
                  name='username'
                />
                <Controller 
                  as={
                    <Form.Item>
                      <Input
                        type='text'
                        placeholder='Email'
                        name='email'
                      />
                    </Form.Item>
                  }

                  name='email'
                  control={control}
                  rules={{ required: true , pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address"
                  }}}
                />
                <Controller 
                  as={
                    <Form.Item>
                      <Input.Password
                        type='password'
                        placeholder='Password'
                        name='password'
                      />
                    </Form.Item>
                  }

                  name='password'
                  control={control}
                  rules={{ required: true, minLength: 6}}
                />
                <Controller 
                  as={
                    <Form.Item>
                      <Input.Password
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                      />
                    </Form.Item>
                  }
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true, validate: (value) => watch('password') === value }}
                />
              
                {errors.username && <p className='danger'>Missing username</p>}
                {errors.email && (
                  (errors.email.type === 'required' && <p className='danger'>Missing email</p>) ||
                  (errors.email.type === 'pattern' && <p className='danger'>Email is invalid</p>)
                )}
                {errors.password && (
                  (errors.password.type === 'minLength' && <p className='danger'>Password is not long enough</p>) ||
                  (errors.password.type === 'required' && <p className='danger'>Password is required</p>)
                )}
                {errors.confirmPassword?.type === 'required' && <p className='danger'>Need to confirm password</p>}
                {errors.confirmPassword?.type === 'validate' && <p className='danger'>Passwords need to match</p>}
                <Button htmlType="submit" className='registerButton'>Register</Button>
              </form>
            </Form>
            <div className='login-info'>
              <Link to='./login'>Login here</Link>
            </div>
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
        message.error("Please confirm your password");
        break;
      }
      case 'validate': {
        message.error("Passwords don't match");
        break;
      }
    }
  }
}
export default RegisterPage
