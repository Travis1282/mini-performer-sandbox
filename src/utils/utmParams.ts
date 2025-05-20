import { PREVIOUS_PARAMS_COOKIE } from '@/constants';
import Cookies from 'js-cookie';

export const utmParams = () => {
  const utmParamsCookie = Cookies.get(PREVIOUS_PARAMS_COOKIE);
  const parsed = utmParamsCookie ? JSON.parse(atob(utmParamsCookie)) : {};
  return parsed;
};
