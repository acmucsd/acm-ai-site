import axios, { AxiosResponse } from 'axios';
import { DimensionType, nanoid } from 'dimensions-ai';
import { competitionAPI } from '../../configs';

// Returns all dimensions if no input
export const getDimension = async (
  id: nanoid = '-1'
): Promise<Array<DimensionType> | DimensionType> => {
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
  dimensionID: nanoid,
  matchID: nanoid
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
  dimensionID: nanoid,
  matchID: nanoid
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
  dimensionID: nanoid,
  matchID: nanoid
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
  dimensionID: nanoid,
  matchID: nanoid
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
  dimensionID: nanoid,
  matchID: nanoid,
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
