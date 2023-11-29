import axios from 'axios';

const MEMBERSHIP_PORTAL_API = 'https://api.acmucsd.com/api/v2';

export type ACMEvent = {
  committee: string;
  cover: string;
  description: string;
  end: string;
  eventLink: string;
  location: string;
  organization: string;
  pointValue: number;
  requiresStaff: boolean;
  staffPointBonus: number;
  start: string;
  thumbnail: string;
  title: string;
  uuid: string;
};

export const fetchFutureEvents = async (): Promise<Array<ACMEvent>> => {
  const res = await axios.get(
    `${MEMBERSHIP_PORTAL_API}/event/future?committee=AI&limit=4`
  );
  return res.data.events;
};

export const fetchPastEvents = async (): Promise<Array<ACMEvent>> => {
  const res = await axios.get(
    `${MEMBERSHIP_PORTAL_API}/event/past?committee=AI&limit=5`
  );
  return res.data.events;
};


/*
List of all APIS
MEMBERSHIP_PORTAL_AP/event/future?committee=AI&limit=4
MEMBERSHIP_PORTAL_AP/event/past?committee=AI&limit=5
REACT_APP_API/v1/users
REACT_APP_API/v1/users/username/resetpassword
REACT_APP_API/v1/auth/login
REACT_APP_API/v1/auth/verify
REACT_APP_API/v1/competitions
REACT_APP_API/v1/competitions/leaderboard
REACT_APP_API/v1/competitions/${competitionid}/${userid}/register
/v1/competitions/matches/${competitionid}/match/${matchId}/replay
*/