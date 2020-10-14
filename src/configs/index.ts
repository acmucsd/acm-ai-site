import { User } from '../UserContext';
import { TournamentMeta } from '../contexts/tournament';

export const DIMENSION_ID = 'oLBptg';
export const TOURNAMENT_ID = 'a0Zlpa';
export const COOKIE_NAME = 'dimension_user_c';
export const COMPETITIONS_COOKIE_NAME = {
  energium: 'energium_dimension_user_c',
  openai: 'openai_user_c',
};
export const OPEN_TO_PUBLIC = true;
export const defaultUser: User = {
  loggedIn: false,
  admin: false,
  username: '',
  id: '',
  competitionRegistrations: {
    energium: undefined,
    openai: undefined,
  },
  competitionData: {
    energium: undefined,
    openai: undefined,
  },
};

export const defaultTournament: TournamentMeta = {
  configs: {
    type: undefined,
    rankSystem: undefined,
  },
  id: '',
  log: '',
  name: '',
  status: null,
  competitors: new Map(),
  dimID: '',
};

export const competitionAPI = 'https://compete.ai.acmucsd.com/api';
