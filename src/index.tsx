import { Hono } from 'hono'

import manifest from '../dist/.vite/manifest.json'

import { getIpAndLoc } from './services/location/get-ip-loc'
import { basicProxy } from './services/proxy'

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file

const app = new Hono()

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  const { ip, loc, latitude, longitude } = getIpAndLoc(c.req.raw)
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
