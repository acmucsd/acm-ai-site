import axios, { AxiosResponse } from 'axios';
import { DUser, Tournament } from '../../types/dimensions';
import { Match } from '../../types/dimensions';
import { TournamentMeta } from '../../contexts/tournament';
import { getToken } from '../../utils/token';
import { competitionAPI, COMPETITIONS_COOKIE_NAME } from '../../configs';

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

export const getUser = async (
  dimensionID: string,
  playerID: string
): Promise<DUser> => {
  let token = getToken(COMPETITIONS_COOKIE_NAME.energium);
  return axios
    .get(competitionAPI + `/dimensions/${dimensionID}/users/${playerID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data.user);
};

export const getMatchesFromDimension = async (
  dimensionID: string
): Promise<{ [k in string]: Match }> => {
  return new Promise((resolve, reject) => {
    axios
      .get(competitionAPI + `/dimensions/${dimensionID}/match`)
      .then((res: AxiosResponse) => {
        resolve(res.data.matches);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getMatchFromDimension = async (
  dimensionID: string,
  matchID: string
): Promise<Match> => {
  return new Promise((resolve, reject) => {
    axios
      .get(competitionAPI + `/dimensions/${dimensionID}/match/${matchID}`)
      .then((res: AxiosResponse) => {
        resolve(res.data.match);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getTournamentFromDimension = async (
  dimensionID: string,
  tournamentID: string
): Promise<TournamentMeta> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        competitionAPI +
          `/dimensions/${dimensionID}/tournaments/${tournamentID}`
      )
      .then((res: AxiosResponse) => {
        resolve(res.data.tournament);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTournamentsFromDimension = async (
  dimensionID: string
): Promise<Array<Tournament>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(competitionAPI + `/dimensions/${dimensionID}/tournaments`)
      .then((res: AxiosResponse) => {
        resolve(res.data.tournaments);
      })
      .catch((error) => {
        // message.error(error.message);
        reject(error);
      });
  });
};
