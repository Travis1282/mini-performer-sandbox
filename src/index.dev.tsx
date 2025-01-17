import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'
import { basicProxy } from './services/proxy'

const app = new Hono()

app.get('/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL))

app.get('*', async (c) => {
  //   console.log(c.env.MY_VAR);
  //   console.log(import.meta.env.VITE_API_URL);
  return c.html(
    renderToString(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script type="module" src="/src/client.tsx"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app
