import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { setCookie, deleteCookie } from '../utils/cookie';
import { User } from '../UserContext';
import { COMPETITIONS_COOKIE_NAME, COOKIE_NAME } from '../configs';

export const resetPassword = async (data: {
  userID: string;
  code: string;
  password: string;
}) => {
  let body = {
    password: data.password,
    resetPasswordKey: data.code,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API +
          '/v1/users/' +
          data.userID +
          '/resetpassword',
        body
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Reset Failed');
        console.log(error);
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const verifyEmail = async (data: { code: string, id : string}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API + '/v1/users/verifyEmail', data)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Verification Failed');
        message.error('Please check your code and expiration time');
        reject(error);
      });
  });
}


export const requestReset = async (username: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API + '/v1/users/' + username + '/resetpassword'
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Request Failed');
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};
export const registerUser = async (data: {
  username: string;
  password: string;
  email: string;
  isUCSD: boolean;
}) => {
  let body = {
    username: data.username,
    password: data.password,
    email: data.email,
    isUCSD: data.isUCSD,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API + '/v1/users', body)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        console.error(error);
        reject(error);
      });
  });
};

export const logoutUser = () => {
  deleteCookie(COOKIE_NAME);
  for (const cookie_name of Object.values(COMPETITIONS_COOKIE_NAME)) {
    deleteCookie(cookie_name);
  }
};
export const getUserFromToken = (token: string): User => {
  let res = tokenGetClaims(token);
  return {
    loggedIn: true,
    admin: false,
    username: res.username,
    id: res.playerID,
    competitionRegistrations: {
      energium: undefined,
      openai: undefined,
    },
    competitionData: {
      energium: undefined,
      openai: undefined,
    },
  };
};

export const tokenGetClaims = (token: string): any => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }
  return JSON.parse(
    window.atob(tokenArray[1].replace('-', '+').replace('_', '/'))
  );
};

export const loginUser = async (
  dimensionID: string,
  data: { username: string; password: string }
) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_API + '/v1/auth/login', data)
      .then((res: AxiosResponse) => {
        setCookie(COOKIE_NAME, res.data.token, 7);
        resolve(res.data.token);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        console.error(error);
        if (error.response.data.error.message === 'User not verified') {

          axios
          .get(process.env.REACT_APP_API + '/v1/users/' + data.username + '/verifyEmail' ) 
          .then((res: AxiosResponse) => {
            resolve(res.data.token);
          })
          .catch((error) => {
            reject(error);
          });

          message.error("Check your email to verify");
        }
        //reject(error);
      });
  });
};

export const verifyToken = async (dimensionID: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API + '/v1/auth/verify',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        //reject(error);
      });
  });
};
