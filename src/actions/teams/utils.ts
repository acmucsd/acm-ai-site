import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../../configs';
import { getToken } from '../../utils/token';

// Get comp user
export const getCompetitionUser = (
  competitionName: string,
  username: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionName}/users/${username}`
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
        process.env.REACT_APP_API +
          `/v1/competitions/teams/${competitionName}/${teamName}`,
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

// Create new team
export const createTeam = async (
  competitionid: string,
  userid: string,
  teamName: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API + `/v1/teams/${competitionid}/new-team`,
        {
          username: userid,
          teamName: teamName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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

export const getSubmissionDetails = async (
  competitionName: string,
  submissionId: string
): Promise<AxiosResponse> => {
  // let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionName}/entry/${submissionId}`
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
export const addToTeam = async (
  competitionName: string,
  username: string,
  teamName: string,
  code: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  let body = {
    username,
    teamName,
    code,
  };

  return new Promise((resolve, reject) => {
    axios
      .post(
        process.env.REACT_APP_API +
          `/v1/competitions/teams/${competitionName}/add-to-team`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(error.response.data.error.message);
        console.error(error);
        reject(error);
      });
  });
};
