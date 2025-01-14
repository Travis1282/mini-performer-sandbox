import { Hono } from "hono";
import { renderToString } from "react-dom/server";

const app = new Hono();

// app.get("/rest/*", (c) => {
//   return fetch(`${import.meta.env.VITE_API_URL_PROXY}/${c.req.path}`, {
//     headers: {
//       "CF-Access-Client-Id": import.meta.env.VITE_API_CLIENT_ID ?? "",
//       "CF-Access-Client-Secret": import.meta.env.VITE_API_CLIENT_SECRET ?? "",
//     },
//   });
// });

app.get("*", async (c) => {
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
  );
});

export default app;
