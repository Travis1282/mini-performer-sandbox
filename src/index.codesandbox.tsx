import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();
app.use(logger());

// Simplified version without external dependencies for demo
app.get('*', async (c) => {
  return c.html(
    `
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>Hono SSR Demo</title>
          <script>
            window.__BOOTSTRAPPED_DATA__ = {
              location: { country: 'US', region: 'CA' },
              features: {},
              closestRegionId: 'us-west'
            };
          </script>
          <script src="/src/client.tsx" type="module"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `
  );
});

export default app;
