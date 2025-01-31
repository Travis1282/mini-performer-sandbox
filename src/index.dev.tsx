import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { buildBootstrappedData } from './services/bootstrappedData'
import { getGrowthbookFeatures } from './services/growthbook/getGrowthbookFeatures'
import { getIpAndLoc } from './services/location/get-ip-loc'
import {
  getSessions,
  setSessionCookiesAndHeaders,
} from './services/ppc/sessions'
import { basicProxy } from './services/proxy'

const app = new Hono()
app.use(logger())

app.on(
  ['GET', 'POST', 'PUT', 'DELETE'],
  '/rest/*',
  basicProxy(import.meta.env.VITE_MAVERICK_URL)
)

app.get('*', async (c) => {
  const ipLocation = getIpAndLoc(c.req.raw)

  const featuresPayload = await getGrowthbookFeatures()

  const sessionsPayload = await getSessions(c)

  setSessionCookiesAndHeaders(c, sessionsPayload)

  return c.html(
    `
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${buildBootstrappedData({ location: ipLocation, featuresPayload, sessionsPayload })}
          <script src="/src/client.tsx" type="module"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `
  )
})

export default app
