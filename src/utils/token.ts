import { getCookie } from './cookie';
import { COOKIE_NAME } from '../configs';
/**
 * Get current stored token
 */
export const getToken = () => {
  return getCookie(COOKIE_NAME);
}