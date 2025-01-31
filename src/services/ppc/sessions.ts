import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import type { paths } from '../maverick/generated/maverick-schema'
import { postSessions } from '../maverick/post-sessions'
import { buildUtmHash } from './buildUtmHash'
import {
  COOKIE_DOMAIN,
  COOKIE_EXPIRY_DAYS,
  COOKIE_SAME_SITE,
  PREVIOUS_PARAMS_COOKIE,
  PROFILE_COOKIE,
  SESSION_COOKIE,
} from './constants'

export async function getSessions(c: Context) {
  let sessionsPayload:
    | paths['/rest/sessions']['post']['responses']['200']['content']['application/json;charset=utf-8']
    | undefined = undefined

  const currentParams = buildUtmHash(new URLSearchParams(c.req.query()))

  const headerMap = {} as Record<string, string>
  for (const [key, value] of c.req.raw.headers.entries()) {
    headerMap[key] = value
  }
  try {
    const { data } = await postSessions({
      body: {
        url: c.req.url,
        params: currentParams,
        headers: headerMap,
      },
    })
    sessionsPayload = data
  } catch (error) {
    console.log(error)
  }

  return sessionsPayload
}

export function setSessionCookiesAndHeaders(
  c: Context,
  sessionsPayload?: paths['/rest/sessions']['post']['responses']['200']['content']['application/json;charset=utf-8']
) {
  const currentParams = buildUtmHash(new URLSearchParams(c.req.query()))
  if (sessionsPayload?.sessionId) {
    c.header('X-Go-Session-Id', sessionsPayload.sessionId)
    setCookie(c, SESSION_COOKIE, sessionsPayload.sessionId, {
      // domain: COOKIE_DOMAIN,
      path: '/',
      sameSite: COOKIE_SAME_SITE,
      secure: true,
    })
  }
  if (sessionsPayload?.profileId) {
    c.header('X-Go-Profile-Id', sessionsPayload.profileId)
    setCookie(c, PROFILE_COOKIE, sessionsPayload.profileId, {
      path: '/',
      // domain: COOKIE_DOMAIN,
      maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
      sameSite: COOKIE_SAME_SITE,
      secure: true,
    })
  }

  setCookie(c, PREVIOUS_PARAMS_COOKIE, btoa(JSON.stringify(currentParams)), {
    path: '/',
    maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
  })
}
