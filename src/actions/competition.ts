import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';

export const LEADERBOARD_TYPES = ['wld', 'public_private', 'basic_score', 'mse'] as const;

export type LeaderboardType = (typeof LEADERBOARD_TYPES)[number];

export const isLeaderboardType = (type?: string): type is LeaderboardType =>
  LEADERBOARD_TYPES.includes(type as LeaderboardType);

export interface CompetitionData {
    rank: number;
    team: string;
    teamGroup?: string;
    score: number;
    submitHistory: Array<string>;
    scoreHistory: Array<number>;
    winHistory?: Array<number>;
    drawHistory?: Array<number>;
    lossHistory?: Array<number>;
    // blockography
    publicScoreHistory?: Array<number>;
    privateScoreHistory?: Array<number>;
    // stellatro
    benchmarkScore?: number | null;
}

export const uploadSubmission = async (
  file: File | undefined,
  tagsSelected: string[],
  desc: string,
  competitionid: string,
  userid: string
): Promise<AxiosResponse> => {
  if (!file) {
    throw new Error('No file selected. Please upload a .zip file before submitting.');
  }

  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    let bodyFormData = new FormData();
    bodyFormData.set('predictions', file);
    bodyFormData.set('description', desc);
    bodyFormData.set('tags', new Blob(tagsSelected));

    axios
      .post(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionid}/${userid}/newScore`,
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

export const uploadCompetitionResults = async (
  file: File | undefined,
  competitionid: string,
): Promise<AxiosResponse> => {
  
  if (!file) {
    throw new Error('no file!');
  }
  if (!competitionid) {
    throw new Error('competition ID not specified!');
  }

  const token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    const bodyFormData = new FormData();
    const csvFile = new File([file], file.name, {type: 'text/csv'});
    bodyFormData.append('results', csvFile);

    axios
      .post(
        process.env.REACT_APP_API + 
          `/v1/competitions/${competitionid}/uploadResults`,
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
        message.error(error);
        reject(error);
      });
  });
}

export const uploadNewCompetition = async (
  payload: NewCompetitionSettingsPayload
) => {
  const token = getToken(COOKIE_NAME);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + `/v1/competitions/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error creating new competition:`, error);
    if (error.response?.data?.error?.message) {
      message.error(error.response.data.error.message);
    } else {
      message.error('Failed to create competition.');
    }
    throw error;
  }
};

export const getCompetitions = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API + `/v1/competitions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
}

export const getCompetitionDetails = async (competitionName: string) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API + `/v1/competitions/${competitionName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${competitionName}:`, error);
    throw error;
  }
};

export const updateCompetitionDescription = async (competitionName: string, description: string) => {
  const token = getToken(COOKIE_NAME);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + `/v1/competitions/${competitionName}/updateDescription`,
      { description },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error updating description for ${competitionName}:`, error);
    if (error.response?.data?.error?.message) {
      message.error(error.response.data.error.message);
    } else {
      message.error('Failed to update competition description.');
    }
    throw error;
  }
};

export type UpdateCompetitionSettingsPayload = {
  submissionsEnabled?: boolean;
  leaderboardEnabled?: boolean;
  leaderboardType?: LeaderboardType;
  submissionFileName?: string;
  inPortal?: boolean;
  minTeamSize?: number;
  maxTeamSize?: number;
  showPrivateScores?: boolean;
};

export type NewCompetitionSettingsPayload = {
  competitionName: string;
  description: string;
  startDate: string;
  endDate: string;
  submissionFileName: string;
  submissionCooldown?: number;
  submissionsEnabled: boolean;
  leaderboardEnabled: boolean;
  leaderboardType: LeaderboardType;
  minTeamSize?: number;
  maxTeamSize?: number;
  showPrivateScores: boolean;
  truthCSV?: string;
};

export const updateCompetitionSettings = async (
  competitionName: string,
  payload: UpdateCompetitionSettingsPayload
) => {
  const token = getToken(COOKIE_NAME);
  try {
    const response = await axios.post(
      process.env.REACT_APP_API + `/v1/competitions/${competitionName}/updateSettings`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error updating settings for ${competitionName}:`, error);
    if (error.response?.data?.error?.message) {
      message.error(error.response.data.error.message);
    } else {
      message.error('Failed to update competition settings.');
    }
    throw error;
  }
};

export const getPortalCompetition = async (): Promise<AxiosResponse> =>
  axios.get(process.env.REACT_APP_API + '/v1/competitions/portal');

export const getMetaData = async (
  competitionid: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};

export const getRanks = async (
  competitionid: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionid}/leaderboard`
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};

export const getLeaderboard = async (
  competitionid: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionid}/leaderboard`
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Could not get leaderboard');
        reject(error);
      });
  });
};

export const registerCompetitionUser = async (
  competitionid: string,
  userid: string
): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    let token = getToken(COOKIE_NAME);
    axios
      .post(
        process.env.REACT_APP_API +
          `/v1/competitions/${competitionid}/${userid}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(`Could not register ${userid} for ${competitionid}`);
        reject(error);
      });
  });
};

export const getSubmissionFileName = async (competitionid: string) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/submissionFileName`);
    return response.data;
  } catch (error) {
    console.error('Error fetching submission file name:', error);
    throw error;
  }
}
export type AdminTeam = {
  teamName: string;
  teamMembers: string[];
  submitHistory: string[];
  scoreHistory: number[];
  publicScoreHistory: number[];
  privateScoreHistory: number[];
  disqualified?: boolean;
};

export type TeamEntry = {
  _id: string;
  submissionDate: string;
  score: number;
  description: string;
  message?: string;
  error?: string;
  evaluationOk?: boolean;
};

export type TeamScore = { score?: number; publicScore?: number; privateScore?: number };

const teamUrl = (competitionName: string, teamName: string) =>
  process.env.REACT_APP_API + `/v1/competitions/teams/${competitionName}/${encodeURIComponent(teamName)}`;

const authHeader = () => ({ headers: { Authorization: `Bearer ${getToken(COOKIE_NAME)}` } });

export const getAdminTeams = async (competitionName: string): Promise<AdminTeam[]> =>
  (await axios.get(process.env.REACT_APP_API + `/v1/competitions/teams/${competitionName}/all`, authHeader())).data;

export const getTeamEntries = async (competitionName: string, teamName: string): Promise<TeamEntry[]> =>
  (await axios.get(teamUrl(competitionName, teamName) + '/entries', authHeader())).data;

export const overrideTeamScore = async (competitionName: string, teamName: string, scores: TeamScore) =>
  (await axios.post(teamUrl(competitionName, teamName) + '/score', scores, authHeader())).data;

export const setTeamDisqualified = async (competitionName: string, teamName: string, disqualified: boolean) =>
  (await axios.post(teamUrl(competitionName, teamName) + '/disqualify', { disqualified }, authHeader())).data;
