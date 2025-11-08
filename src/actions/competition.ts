import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';

export type PastCompetition = {
  name: string;
  year: number;
  description: string;
  route: string;
};

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
}

export const uploadSubmission = async (
  file: File | undefined,
  tagsSelected: string[],
  desc: string,
  competitionid: string,
  userid: string
): Promise<AxiosResponse> => {
  if (!file) {
    throw new Error('no file!');
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
  minTeamSize?: number;
  maxTeamSize?: number;
  showPrivateScores?: boolean;
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

export const getSubmissionMatches = async (
  competitionid: string,
  submissionid: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/matches/${competitionid}/match/entry/${submissionid}`,
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
        message.error('Could not get submission matches');
        reject(error);
      });
  });
};

export const getSubmissionReplay = async (
  competitionid: string,
  matchId: string
): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/v1/competitions/matches/${competitionid}/match/${matchId}/replay`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      )
      .then((res: AxiosResponse) => {
        // create file link in browser's memory
        const href = URL.createObjectURL(res.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'replay.zip'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        resolve(res);
      })
      .catch((error) => {
        message.error('Could not get match replay');
        reject(error);
      });
  });
};
