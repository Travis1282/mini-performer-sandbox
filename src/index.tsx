import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { buildBootstrappedData } from './services/bootstrappedData';
import { getGrowthbookFeatures } from './services/growthbook/getGrowthbookFeatures';
import { getLocationRegion } from './services/location/getLocationRegion';
import { getSessions, setSessionCookiesAndHeaders } from './services/ppc/sessions';
import { basicProxy } from './services/proxy';

interface ManifestEntry {
  css?: string[];
  file: string;
}

const manifest: Record<string, ManifestEntry> = {
  'src/client.tsx': {
    file: 'assets/client.js',
    css: ['assets/client.css'],
  },
};

const cssFile: string | undefined = manifest['src/client.tsx']?.css?.[0];
const entryFile: string | undefined = manifest['src/client.tsx']?.file;

const app = new Hono();
app.use(logger());

app.on(['GET', 'POST', 'PUT', 'DELETE'], '/rest/*', basicProxy(import.meta.env.VITE_MAVERICK_URL));

app.get('*', async (c, next) => {
  const sessionsPayload = await getSessions(c);

  setSessionCookiesAndHeaders(c, sessionsPayload);

  await next();
});

app.get('*', async (c) => {
  const { ipLocation, closestRegionId } = await getLocationRegion(c);

  const featuresPayload = await getGrowthbookFeatures();

  return c.html(
    `
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          ${buildBootstrappedData({ location: ipLocation, featuresPayload, closestRegionId })}

          ${cssFile ? `<link crossorigin href=/${cssFile} rel="stylesheet" />` : null}
        </head>
        <body>
          <div id="root"></div>
          ${entryFile ? `<script crossorigin async type="module" src=/${entryFile}></script>` : null}
        </body>
      </html>
    `
  );
});

export default app;
