import { Hono } from 'hono'
import manifest from '../dist/.vite/manifest.json'
import { buildBootstrappedData } from './services/bootstrappedData'
import { getGrowthbookFeatures } from './services/growthbook/getGrowthbookFeatures'
import { getIpAndLoc } from './services/location/get-ip-loc'
import {
  getSessions,
  setSessionCookiesAndHeaders,
} from './services/ppc/sessions'
import { basicProxy } from './services/proxy'

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file
import { logger } from 'hono/logger'

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
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${buildBootstrappedData({ location: ipLocation, featuresPayload, sessionsPayload })}

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
