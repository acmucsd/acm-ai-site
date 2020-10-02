import axios, { AxiosResponse } from 'axios';
import { DimensionType, Match, Tournament, nanoid } from 'dimensions-ai';
import { TournamentMeta } from '../contexts/tournament';
import { getToken } from '../utils/token';
import { Database } from 'dimensions-ai/lib/Plugin/Database';

// Returns all dimensions if no input
export const getDimension = async (id: nanoid = '-1'): Promise<Array<DimensionType> | DimensionType> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + '/api/dimensions/' + (id === '-1' ? '' : id)).then((res: AxiosResponse) => {
      if (id === '-1') {
        resolve(res.data.dimensions);
      }
      else {
        resolve(res.data.dimension);
      }
    }).catch((error) => {
      reject(error);
    })
  })
}

export const getUser = async (dimensionID: nanoid, playerID: nanoid): Promise<Database.User> => {
  let token = getToken();
  return axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/user/${playerID}`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data.user)
}


export const getMatchesFromDimension = async (dimensionID: nanoid): Promise<{[k in string]: Match}> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match`).then((res: AxiosResponse) => {
      resolve(res.data.matches);
    }).catch((error) => {
      reject(error);
    });
  });
}
export const getMatchFromDimension = async (dimensionID: nanoid, matchID: nanoid): Promise<Match> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/match/${matchID}`).then((res: AxiosResponse) => {
      resolve(res.data.match);
    }).catch((error) => {
      reject(error);
    });
  });
}
export const getTournamentFromDimension = async (dimensionID: nanoid, tournamentID: nanoid): Promise<TournamentMeta> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament/${tournamentID}`).then((res: AxiosResponse) => {
      resolve(res.data.tournament);
    }).catch((error) => {
      reject(error);
    });
  });
}


export const getTournamentsFromDimension = async (dimensionID: nanoid): Promise<Array<Tournament>> => {
  return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_API + `/api/dimensions/${dimensionID}/tournament`).then((res: AxiosResponse) => {
      resolve(res.data.tournaments);
    }).catch((error) => {
      // message.error(error.message);
      reject(error);
    });
  });
}