import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';

export const uploadSubmission = async (
  file: File | undefined,
  competitionid: string,
  userid: string
): Promise<AxiosResponse> => {
  if (!file) {
    throw new Error('no file!');
  }

  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    let bodyFormData = new FormData();
    bodyFormData.set('predictions', file);

    axios
      .post(
        process.env.REACT_APP_API + `/v1/competitions/${competitionid}/${userid}/newScore`,
        bodyFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
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

export const getMetaData = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};
export const getRanks = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/leaderboard`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};