import type { FeatureApiResponse } from '@growthbook/growthbook-react'

import { Hono } from 'hono'

import manifest from '../dist/.vite/manifest.json'
import { gbClientKey } from './services/config'
import { getIpAndLoc } from './services/location/get-ip-loc'
import { getFeatures } from './services/maverick/get-features'
import { basicProxy } from './services/proxy'

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file

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
