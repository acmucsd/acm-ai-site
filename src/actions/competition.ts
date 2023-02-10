import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { competitionAPI, COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';

export const uploadSubmission = async (
  file: File | undefined,
  tagsSelected: string[],
  desc: string,
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
    bodyFormData.set('description', desc)
    bodyFormData.set('tags', new Blob(tagsSelected))

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

export const getLeaderboard = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/leaderboard`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error("Could not get leaderboard");
        reject(error);
      });
  })
}

export const registerCompetitionUser = async (competitionid: string, userid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    let token = getToken(COOKIE_NAME);
    axios
      .post(
        process.env.REACT_APP_API + `/v1/competitions/${competitionid}/${userid}/register`,
        {
          'username': userid
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(`Could not register ${userid} for ${competitionid}`);
        reject(error);
      });
  })
}