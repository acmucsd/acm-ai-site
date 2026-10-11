import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

export const getNNRanks = async (): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + '/v1/nncompetition/')
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};
