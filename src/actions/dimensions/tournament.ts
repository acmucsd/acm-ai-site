import axios, { AxiosResponse } from 'axios';
import { Match, Player } from '../../types/dimensions';
import { message } from 'antd';
import { getToken } from '../../utils/token';
import {
  competitionAPI,
  COMPETITIONS_COOKIE_NAME,
  COOKIE_NAME,
} from '../../configs';

export const getConfigs = async (
  dimensionID: string,
  tournamentID: string
): Promise<any> => {};
export const getRanks = async (
  dimensionID: string,
  tournamentID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/ranks`
      )
      .then((res: AxiosResponse) => {
        resolve(res.data.ranks);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        reject(error);
      });
  });
};

export const getMatch = async (
  dimensionID: string,
  tournamentID: string,
  matchID: string
): Promise<Match> => {
  return axios
    .get(
      competitionAPI +
        `/dimensions/${dimensionID}/tournaments/${tournamentID}/match/${matchID}`
    )
    .then((res) => res.data.match);
};

export const getMatches = async (
  dimensionID: string,
  tournamentID: string
): Promise<{ [x in string]: Match }> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/match`
      )
      .then((res: AxiosResponse) => {
        resolve(res.data.matches);
      })
      .catch((error) => {
        // message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const runTournament = async (
  dimensionID: string,
  tournamentID: string
): Promise<any> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return new Promise((resolve, reject) => {
    axios
      .post(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/run`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        // message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const stopTournament = async (
  dimensionID: string,
  tournamentID: string
): Promise<any> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return new Promise((resolve, reject) => {
    axios
      .post(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/stop`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        // message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const removeTournament = async (
  dimensionID: string,
  tournamentID: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/stop`
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        // message.error(error.response.data.error.message);
        reject(error);
      });
  });
};

export const getPlayer = async (
  dimensionID: string,
  tournamentID: string,
  playerID: string
): Promise<Player> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return axios
    .get(
      competitionAPI +
        `/dimensions/${dimensionID}/tournaments/${tournamentID}/players/${playerID}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => res.data.player);
};

export const getPlayerMatches = async (
  dimensionID: string,
  tournamentID: string,
  playerID: string,
  offset: number = 0,
  limit: number = 10
): Promise<Array<Match>> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return axios
    .get(
      competitionAPI +
        `/dimensions/${dimensionID}/tournaments/${tournamentID}/players/${playerID}/match?offset=${offset}&limit=${limit}&order=-1`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => res.data.matches);
};

export const downloadBot = async (
  dimensionID: string,
  tournamentID: string,
  playerID: string
): Promise<any> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return axios
    .get(
      competitionAPI +
        `/dimensions/${dimensionID}/tournaments/${tournamentID}/players/${playerID}/bot`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => res.data.url);
};

export const downloadReplay = async (
  dimensionID: string,
  tournamentID: string,
  matchID: string
): Promise<any> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return axios
    .get(
      competitionAPI +
        `/dimensions/${dimensionID}/tournaments/${tournamentID}/match/${matchID}/replay`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      const link = document.createElement('a');
      link.href = res.data.url;
      link.setAttribute('download', 'file.json'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
};

export const uploadBot = async (
  dimensionID: string,
  tournamentID: string,
  name: string,
  file: File | undefined,
  userid: string,
  path: string
) => {
  if (!file) {
    throw new Error('no file!');
  }
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return new Promise((resolve, reject) => {
    let bodyFormData = new FormData();
    bodyFormData.set('names', JSON.stringify([name]));
    bodyFormData.set('playerIDs', JSON.stringify([userid]));
    bodyFormData.set('paths', JSON.stringify([path]));
    bodyFormData.append('files', file);
    axios
      .post(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}/upload`,
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
