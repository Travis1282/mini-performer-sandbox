import Cookies from 'js-cookie';

// checks for accessToken and profile in cookies
// this can only partically check due to the secure cookies set by the api
// but can be used to redirect unauthenticated users
export function isAuthenticated() {
  return Cookies.get('accessToken') && Cookies.get('profile');
}
