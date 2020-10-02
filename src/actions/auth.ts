import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { setCookie, deleteCookie } from '../utils/cookie';
import { nanoid } from 'dimensions-ai';
import { User } from '../UserContext';
import { COOKIE_NAME } from '../configs';

export const registerUser = async (dimensionID: nanoid, data: { username: string, password: string, email: string}) => {
  let body = {
    username: data.username,
    password: data.password,
    userData: {
      email: data.email
    }
  }
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + '/api/dimensions/' + dimensionID + '/auth/register', body).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const logoutUser = () => {
  deleteCookie(COOKIE_NAME);
}
export const getUserFromToken = (token: string): User => {
  let res = tokenGetClaims(token);
  return {
    loggedIn: true,
    admin: false,
    username: res.username,
    id: res.playerID
  };
}

export const tokenGetClaims = (token: string): any => {
  if (!token) {
    return {};
  }
  const tokenArray = token.split('.');
  if (tokenArray.length !== 3) {
    return {};
  }
  return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

export const loginUser = async (dimensionID: nanoid, data: { username: string, password: string}) => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + '/api/dimensions/' + dimensionID + '/auth/login', data).then((res: AxiosResponse) => {
      setCookie(COOKIE_NAME, res.data.token, 7);
      resolve(res.data.token);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const verifyToken = async (dimensionID: nanoid, token: string) => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + '/api/dimensions/' + dimensionID + '/auth/verify', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}