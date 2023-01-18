import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';

const API =
  'http://localhost:9000/v1/teams/TEST';

export const getTeams = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('teams Failed lol');
        console.log(error);
        reject(error);
      });
  });
};