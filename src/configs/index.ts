import { User } from "../UserContext";
import { TournamentMeta } from "../contexts/tournament";

export const DIMENSION_ID = 'oLBptg';
export const TOURNAMENT_ID = 'a0Zlpa';
export const COOKIE_NAME = 'dimension_user_c';
export const OPEN_TO_PUBLIC = true;
export const defaultUser: User = {
  loggedIn: false,
  admin: false,
  username: '',
  id: ''
}

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
}