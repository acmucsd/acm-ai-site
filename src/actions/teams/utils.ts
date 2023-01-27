import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../configs';
import { getToken } from '../../utils/token';

// Checks if user is registered in competition
export const getRegisteredState = (
  competitionName: string,
  username: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        // TODO: remove this hardcoded thing
        // `http://localhost:9000/v1/competitions/${competitionName}/${username}`
        process.env.REACT_APP_API + `/v1/competitions/${competitionName}/${username}`
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

// Get all teams of a competition
export const getTeams = async (
  competitionName: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        // TODO: remove hardcoded thing
        // `http://localhost:9000/v1/competitions/teams/${competitionName}`,
        process.env.REACT_APP_API + `/v1/competitions/teams/${competitionName}`,
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

// Get team info of a specific team in a competition
export const getTeamInfo = async (
  competitionName: string,
  teamName: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        // TODO: remove hardcoded thing
        // `http://localhost:9000/v1/competitions/teams/${competitionName}/${teamName}`,
        process.env.REACT_APP_API + `/v1/competitions/teams/${competitionName}/${teamName}`,
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