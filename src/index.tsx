import { Hono } from 'hono'
import manifest from '../dist/.vite/manifest.json'
import { buildBootstrappedData } from './services/bootstrappedData'
import { getGrowthbookFeatures } from './services/growthbook/getGrowthbookFeatures'
import { getIpAndLoc } from './services/location/get-ip-loc'
import { basicProxy } from './services/proxy'

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file

const app = new Hono()

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  const ipLocation = getIpAndLoc(c.req.raw)

  const featuresPayload = await getGrowthbookFeatures()

  // const sessionsPayload:
  //   | paths['/rest/sessions']['post']['responses']['200']['content']['application/json;charset=utf-8']
  //   | undefined = undefined

  // const currentParams = buildUtmHash(new URLSearchParams(c.req.query()))

  // const headerMap = {} as Record<string, string>
  // for (const [key, value] of c.req.raw.headers.entries()) {
  //   headerMap[key] = value
  // }
  // try {
  //   const { data } = await postSessions({
  //     body: {
  //       url: c.req.url,
  //       params: currentParams,
  //       headers: headerMap,
  //     },
  //   })
  //   sessionsPayload = data
  // } catch (error) {
  //   console.log('sessions error', error)
  // }

  // console.log({ sessionsPayload })

  // if (sessionsPayload?.sessionId) {
  //   c.header('X-Go-Session-Id', sessionsPayload.sessionId)
  //   setCookie(c, SESSION_COOKIE, sessionsPayload.sessionId, {
  //     domain: COOKIE_DOMAIN,
  //     sameSite: COOKIE_SAME_SITE,
  //     secure: true,
  //     path: '/',
  //   })
  // }
  // if (sessionsPayload?.profileId) {
  //   c.header('X-Go-Profile-Id', sessionsPayload.profileId)
  //   setCookie(c, PROFILE_COOKIE, sessionsPayload.profileId, {
  //     path: '/',
  //     domain: COOKIE_DOMAIN,
  //     sameSite: COOKIE_SAME_SITE,
  //     secure: true,
  //     maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
  //   })
  // }

  // setCookie(c, PREVIOUS_PARAMS_COOKIE, btoa(JSON.stringify(currentParams)), {
  //   path: '/',
  //   maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60,
  // })

  return c.html(
    `
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${buildBootstrappedData({ location: ipLocation, featuresPayload })}

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
