import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { COOKIE_NAME } from "../../configs";
import { getToken } from "../../utils/token";

export const uploadNN = async (
  file: File | undefined,
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
        process.env.REACT_APP_API + `/v1/nncompetition/${userid}/newScore`,
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
        message.error('Upload Failed');
        reject(error);
      });
  });
};

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