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
  newsletterOptedIn: boolean;
  major?: string;
  graduationYear?: number;
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

export const updateProfile = async (values: {
  major?: string;
  graduationYear?: number;
}): Promise<void> => {
  const token = getToken();
  const username = tokenGetClaims(token).username;
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API + '/v1/users/' + username + '/updateProfile',
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        message.success('Profile Updated');
        resolve();
      })
      .catch((error) => {
        message.error('Profile Update Failed');
        reject(error);
      });
  });
};

export const newsletterOptIn = async (optIn: boolean): Promise<void> => {
  const token = getToken();
  const username = tokenGetClaims(token).username;
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API +
          '/v1/users/' +
          username +
          (optIn ? '/newsletterOptIn' : '/newsletterOptOut'),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        message.success(optIn ? 'Opted In' : 'Opted Out');
        resolve();
      })
      .catch((error) => {
        message.error('Newsletter Status Update Failed');
        reject(error);
      });
  });
};

export const getUsers = async (): Promise<{ users: string[] }> => {
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + '/v1/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        resolve(res.data as { users: string[] });
      })
      .catch((error) => {
        message.error('Failed to fetch users.');
        reject(error);
      });
  });
};

export const promoteUserToAdmin = async (userId: string): Promise<void> => {
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API + `/v1/users/${userId}/makeAdmin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        message.success(`User ${userId} promoted to admin.`);
        resolve();
      })
      .catch((error) => {
        message.error(`Failed to promote user ${userId} to admin.`);
        reject(error);
      });
  });
};

export const promoteUserToPrimaryAdmin = async (userId: string): Promise<void> => {
  const token = getToken();
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API + `/v1/users/${userId}/makePrimaryAdmin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        message.success(`User ${userId} promoted to primary admin.`);
        resolve();
      })
      .catch((error) => {
        message.error(`Failed to promote user ${userId} to primary admin.`);
        reject(error);
      });
  });
};
