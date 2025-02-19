import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { buildBootstrappedData } from './services/bootstrappedData'
import { getGrowthbookFeatures } from './services/growthbook/getGrowthbookFeatures'
import { getLocationRegion } from './services/location/getLocationRegion'
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

app.get('*', async (c, next) => {
  const sessionsPayload = await getSessions(c)

  console.log(sessionsPayload)

  setSessionCookiesAndHeaders(c, sessionsPayload)
  await next()
})

app.get('*', async (c) => {
  const { ipLocation, closestRegionId } = await getLocationRegion(c)

  const featuresPayload = await getGrowthbookFeatures()

  return c.html(
    `
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${buildBootstrappedData({ location: ipLocation, featuresPayload, closestRegionId })}
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
