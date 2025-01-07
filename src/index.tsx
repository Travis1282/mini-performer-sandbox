import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const manifestPath = ".vite/manifest.json";
let cssFile: string | null = null;

const app = new Hono();

app.get("*", async (c) => {
  if (import.meta.env.PROD && !cssFile) {
    cssFile = (await import(manifestPath)).default["src/client.tsx"]?.css?.at(
      0
    );
  }
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />

          {cssFile ? <link rel="stylesheet" href={cssFile} /> : null}
          <link href="/static/style.css" rel="stylesheet" />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/src/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

export default app;
