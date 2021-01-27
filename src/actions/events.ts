import axios from 'axios';

const MEMBERSHIP_PORTAL_API =
  'https://api.acmucsd.com/api/v2';

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
