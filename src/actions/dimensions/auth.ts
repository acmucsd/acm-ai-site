import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { setCookie } from '../../utils/cookie';

import { User } from '../../UserContext';
import { competitionAPI, COMPETITIONS_COOKIE_NAME } from '../../configs';

// use same password as acm ai user
export const registerUser = async (
  dimensionID: string,
  data: { username: string; password: string }
) => {
  let body = {
    username: data.username,
    password: data.password,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        competitionAPI + '/dimensions/' + dimensionID + '/auth/register',
        body
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const getUserFromToken = (token: string): User => {
  let res = tokenGetClaims(token);
  return {
    loggedIn: true,
    admin: false,
    username: res.username,
    id: res.playerID,
    competitionRegistrations: {
      energium: false,
      openai: false,
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
      .post(competitionAPI + '/dimensions/' + dimensionID + '/auth/login', data)
      .then((res: AxiosResponse) => {
        setCookie(COMPETITIONS_COOKIE_NAME.energium, res.data.token, 7);
        resolve(res.data.token);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const verifyToken = async (dimensionID: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        competitionAPI + '/dimensions/' + dimensionID + '/auth/verify',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        // message.error(error.response.data.error.message);
        reject(error);
      });
  });
};
