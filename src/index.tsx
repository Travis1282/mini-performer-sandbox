import type { FeatureApiResponse } from '@growthbook/growthbook-react'

import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { logger } from 'hono/logger'

import type { paths } from './services/maverick/generated/maverick-schema'
import manifest from '../dist/.vite/manifest.json'
import { gbClientKey } from './services/config'
import { getIpAndLoc } from './services/location/get-ip-loc'
import { getFeatures } from './services/maverick/get-features'
import { postSessions } from './services/maverick/post-sessions'
import { buildUtmHash } from './services/ppc/buildUtmHash'
import {
  COOKIE_DOMAIN,
  COOKIE_EXPIRY_DAYS,
  COOKIE_SAME_SITE,
  PREVIOUS_PARAMS_COOKIE,
  PROFILE_COOKIE,
  SESSION_COOKIE,
} from './services/ppc/constants'
import { basicProxy } from './services/proxy'

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file

const app = new Hono()

app.use(logger())

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  const { ip, loc, latitude, longitude } = getIpAndLoc(c.req.raw)

  let featuresPayload: FeatureApiResponse | undefined = undefined
  try {
    const { data } = await getFeatures({
      params: {
        path: {
          clientKey: gbClientKey,
        },
      },
    })
    featuresPayload = data as FeatureApiResponse // maverick has incorrect types for this
  } catch (error) {
    console.log(error)
  }

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

  if (sessionsPayload?.sessionId) {
    c.header('X-Go-Session-Id', sessionsPayload.sessionId)
    setCookie(c, SESSION_COOKIE, sessionsPayload.sessionId, {
      domain: COOKIE_DOMAIN,
      sameSite: COOKIE_SAME_SITE,
      secure: true,
      path: '/',
    })
  }
  if (sessionsPayload?.profileId) {
    c.header('X-Go-Profile-Id', sessionsPayload.profileId)
    setCookie(c, PROFILE_COOKIE, sessionsPayload.profileId, {
      path: '/',
      domain: COOKIE_DOMAIN,
      sameSite: COOKIE_SAME_SITE,
      secure: true,
      maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
    })
  }

  setCookie(c, PREVIOUS_PARAMS_COOKIE, btoa(JSON.stringify(currentParams)), {
    path: '/',
    maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
  })

  return c.html(
    `
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script>
            window.__GT_LOC__ = ${JSON.stringify({
              ip,
              loc,
              latitude,
              longitude,
            })}
          </script>
          <script>window.__GT_GB_PAYLOAD__ = ${JSON.stringify(featuresPayload)}</script>

          ${cssFile ? `<link crossorigin href=/${cssFile} rel="stylesheet" />` : null}
        </head>
        <body>
          <div id="root"></div>
          ${entryFile ? `<script crossorigin async type="module" src=/${entryFile}></script>` : null}
        </body>
      </html>
    `
  )
})

export default app
