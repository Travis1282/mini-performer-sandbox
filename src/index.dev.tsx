import type { FeatureApiResponse } from '@growthbook/growthbook-react'
import { Hono } from 'hono'
import { gbClientKey } from './services/config'
import { getIpAndLoc } from './services/location/get-ip-loc'
import { getFeatures } from './services/maverick/get-features'
import { basicProxy } from './services/proxy'

const app = new Hono()

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
  return c.html(
    `
      <html lang="en">
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
            window.__GT_GB_PAYLOAD__ = ${JSON.stringify(featuresPayload)}
          </script>
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
