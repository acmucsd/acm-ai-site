import { User } from '../UserContext';

export const COOKIE_NAME = 'acmai_token';
export const SITE_DOMAIN = 'ai.acmucsd.com';
export const defaultUser: User = {
  loggedIn: false,
  admin: false,
  username: '',
  id: '',
};
