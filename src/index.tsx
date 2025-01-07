import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import fs from "fs";

const manifestPath = "../dist/.vite/manifest.json";
let cssFile: string | null = null;

if (import.meta.env.PROD) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as Record<
    string,
    { css: string[] }
  >;
  cssFile = manifest["src/client.tsx"].css[0];
}

// import.meta.env.PROD
//   ? (await import(manifestPath)).default["src/client.tsx"]?.css?.at(0)
//   : null;

const app = new Hono();

app.get("*", (c) => {
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
