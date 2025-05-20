import Cookies from 'js-cookie';
import { PREVIOUS_PARAMS_COOKIE } from './constants';

export function getUtmHashCookie() {
  const utmParamsCookie = Cookies.get(PREVIOUS_PARAMS_COOKIE);
  const parsed = utmParamsCookie ? JSON.parse(atob(utmParamsCookie)) : {};
  return parsed;
}
