import type { Middleware } from "openapi-fetch";

export const cloudflareHeadersMiddleware: Middleware = {
  async onRequest({ request }) {
    request.headers.set(
      "CF-Access-Client-Id",
      import.meta.env.VITE_API_CLIENT_ID ?? ""
    );
    request.headers.set(
      "CF-Access-Client-Secret",
      import.meta.env.VITE_API_CLIENT_SECRET ?? ""
    );
    return request;
  },
};
