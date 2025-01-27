import { Hono } from 'hono'

import { getIpAndLoc } from './services/location/get-ip-loc'
import { basicProxy } from './services/proxy'

const app = new Hono()

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  const { ip, loc, latitude, longitude } = getIpAndLoc(c.req.raw)
  console.log({ ip, loc, latitude, longitude })
  return c.html(
    `
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
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
