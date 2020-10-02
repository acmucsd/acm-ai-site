import axios, { AxiosResponse } from 'axios';
import { Match, nanoid, Player } from 'dimensions-ai';
import { message } from 'antd';
import { User } from '../UserContext';
import { getToken } from '../utils/token';
import { Database } from 'dimensions-ai/lib/Plugin/Database';


export const getConfigs = async (dimensionID: number, tournamentID: number): Promise<any> => {

};
export const getRanks = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/ranks`).then((res: AxiosResponse) => {
      resolve(res.data.ranks);
    }).catch((error) => {
      message.error(error.response.data.message);
      reject(error);
    });
  });
}

export const getMatch = async (dimensionID: nanoid, tournamentID: nanoid, matchID: nanoid): Promise<Match> => {
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/match/${matchID}`).then((res) => res.data.match)
};

export const getMatches = async (dimensionID: nanoid, tournamentID: nanoid): Promise<{[x in string]: Match}> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const getMatchQueue = async (dimensionID: nanoid, tournamentID: nanoid): Promise<Array<Array<Player>>> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/matchQueue`).then((res: AxiosResponse) => {
      resolve(res.data.matchQueue);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const runTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  let token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/run`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const stopTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  let token = getToken();
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const removeTournament = async (dimensionID: nanoid, tournamentID: nanoid): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/stop`).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      // message.error(error.response.data.error.message);
      reject(error);
    });
  });
}

export const getPlayer = async (dimensionID: nanoid, tournamentID: nanoid, playerID: nanoid): Promise<Player> => {
  let token = getToken();
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/player/${playerID}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data.player)
}

export const getPlayerMatches = async (dimensionID: nanoid, tournamentID: nanoid, playerID: nanoid, offset: number = 0, limit: number = 10): Promise<Array<Match>> => {
  let token = getToken();
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/player/${playerID}/match?offset=${offset}&limit=${limit}&order=-1`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data.matches)
}

export const downloadBot = async (dimensionID: nanoid, tournamentID: nanoid, playerID: nanoid): Promise<any> => {
  let token = getToken();
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/player/${playerID}/bot`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data.url)
};

export const downloadReplay = async (dimensionID: nanoid, tournamentID: nanoid, matchID: nanoid): Promise<any> => {
  let token = getToken();
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/match/${matchID}/replay`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
    console.log(res.data.url);
    const link = document.createElement('a');
    link.href = res.data.url;
    link.setAttribute('download', 'file.json'); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
};

export const uploadBot = async (dimensionID: nanoid, tournamentID: nanoid, name: string, file: File | undefined, user: User, path: string) => {
  if (!file) {
    throw new Error('no file!');
  }
  let token = getToken();
  return new Promise((resolve, reject) => {
    let bodyFormData = new FormData();
    bodyFormData.set('names', JSON.stringify([name]));
    bodyFormData.set('playerIDs', JSON.stringify([user.id]));
    bodyFormData.set('paths', JSON.stringify([path]));
    bodyFormData.append('files', file);
    axios.post(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}/upload`, bodyFormData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then((res: AxiosResponse) => {
      resolve(res);
    }).catch((error) => {
      message.error(error.response.data.error.message);
      reject(error);
    });
  });
}