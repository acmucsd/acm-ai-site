import { User } from '../UserContext';

export const COOKIE_NAME = 'dimension_user_c';
export const defaultUser: User = {
  loggedIn: false,
  admin: false,
  username: '',
  id: '',
};
