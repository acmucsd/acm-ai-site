import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { competitionAPI, COOKIE_NAME } from '../configs';
import { getToken } from '../utils/token';


export type PastCompetition = {
  name: string, 
  year: number, 
  description: string
};

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
    bodyFormData.set('description', desc)
    bodyFormData.set('tags', new Blob(tagsSelected))

    axios
      .post(
        process.env.REACT_APP_API + `/v1/competitions/${competitionid}/${userid}/newScore`,
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

export const getMetaData = async (competitionid: string): Promise<AxiosResponse> => {
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

export const getRanks = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/leaderboard`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error('Ranks Failed');
        reject(error);
      });
  });
};

export const getLeaderboard = async (competitionid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/${competitionid}/leaderboard`)
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error("Could not get leaderboard");
        reject(error);
      });
  })
}

export const registerCompetitionUser = async (competitionid: string, userid: string): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    let token = getToken(COOKIE_NAME);
    axios
      .post(
        process.env.REACT_APP_API + `/v1/competitions/${competitionid}/${userid}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      ).then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error(`Could not register ${userid} for ${competitionid}`);
        reject(error);
      });
  })
}

export const getSubmissionMatches = async (competitionid: string, submissionid: string): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/matches/${competitionid}/match/entry/${submissionid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error) => {
        message.error("Could not get submission matches");
        reject(error);
      });
  })
}

export const getSubmissionReplay = async (competitionid: string, matchId: string): Promise<AxiosResponse> => {
  let token = getToken(COOKIE_NAME);
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_API + `/v1/competitions/matches/${competitionid}/match/${matchId}/replay`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob',
      })
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
        message.error("Could not get match replay");
        reject(error);
      });
  })
}

