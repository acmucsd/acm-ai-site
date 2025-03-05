import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/token';
import { tokenGetClaims } from './auth';

// not using the existing User interface because it is made for competitions
export interface UserProfile {
  username: string;
  email: string;
  isUCSD: boolean;
  admin: boolean;
  primaryAdmin: boolean;
  creationDate: string;
}

export const profileData = async (): Promise<UserProfile> => {
  const token = getToken();
  const username = tokenGetClaims(token).username;
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + '/v1/users/' + username, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        resolve(res.data.user as UserProfile);
      })
      .catch((error) => {
        message.error('Profile Fetch Failed');
        reject(error);
      });
  });
};
