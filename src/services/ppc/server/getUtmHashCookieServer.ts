import type { Context } from 'hono'
import { getCookie } from 'hono/cookie'
import { PREVIOUS_PARAMS_COOKIE } from '../constants'

// server only
export function getUtmHashCookieServer(c: Context) {
  const utmParamsCookie = getCookie(c, PREVIOUS_PARAMS_COOKIE)
  const parsed = utmParamsCookie ? JSON.parse(atob(utmParamsCookie)) : {}
  return parsed
}
