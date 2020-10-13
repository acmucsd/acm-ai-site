import { getCookie } from './cookie';
import { COOKIE_NAME } from '../configs';
/**
 * Get current stored token
 */
export const getToken = (cookie = COOKIE_NAME) => {
  return getCookie(cookie);
}