import axios, { AxiosResponse } from 'axios';
import { competitionAPI } from '../../configs';

// Returns all dimensions if no input
export const getDimension = async (
  id: string = '-1'
): Promise<Array<any> | any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(competitionAPI + '/dimensions/' + (id === '-1' ? '' : id))
      .then((res: AxiosResponse) => {
        if (id === '-1') {
          resolve(res.data.dimensions);
        } else {
          resolve(res.data.dimension);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const runMatch = async (
  dimensionID: string,
  matchID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(competitionAPI + `/dimensions/${dimensionID}/match/${matchID}/run`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const stopMatch = async (
  dimensionID: string,
  matchID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(competitionAPI + `/dimensions/${dimensionID}/match/${matchID}/stop`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resumeMatch = async (
  dimensionID: string,
  matchID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(competitionAPI + `/dimensions/${dimensionID}/match/${matchID}/run`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeMatch = async (
  dimensionID: string,
  matchID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .delete(competitionAPI + `/dimensions/${dimensionID}/match/${matchID}`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUrlForAgentLog = async (
  dimensionID: string,
  matchID: string,
  agentID: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        competitionAPI +
          `/dimensions/${dimensionID}/match/${matchID}/agents/${agentID}/logs`
      )
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
