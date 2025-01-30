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
import { PROFILE_COOKIE, SESSION_COOKIE } from './services/ppc/constants'
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

  const headerMap = {} as Record<string, string>
  for (const [key, value] of c.req.raw.headers.entries()) {
    headerMap[key] = value
  }
  try {
    const { data } = await postSessions({
      body: {
        url: c.req.url,
        params: buildUtmHash(new URLSearchParams(c.req.query())),
        headers: headerMap,
      },
    })
    sessionsPayload = data
  } catch (error) {
    console.log(error)
  }

  if (sessionsPayload?.sessionId) {
    setCookie(c, SESSION_COOKIE, sessionsPayload.sessionId)
  }
  if (sessionsPayload?.profileId) {
    setCookie(c, PROFILE_COOKIE, sessionsPayload.profileId)
  }

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
