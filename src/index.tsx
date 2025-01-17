import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

import manifest from '../dist/.vite/manifest.json'
import { basicProxy } from './services/proxy'
const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0]
const entryFile: string | undefined = manifest['src/client.tsx']?.file

const app = new Hono()

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          {cssFile ? <link href={`/${cssFile}`} rel="stylesheet" /> : null}
        </head>
        <body>
          <div id="root"></div>
          {entryFile ? <script async src={`/${entryFile}`}></script> : null}
        </body>
      </html>
    )
  )
})

export default app
