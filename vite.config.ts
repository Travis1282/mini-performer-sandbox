import build from "@hono/vite-build/cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProd = process.env.NODE_ENV === "production";
  if (mode === "client") {
    return {
      build: {
        manifest: true,
        rollupOptions: {
          input: "./src/client.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  } else {
    return {
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        build(),
        devServer({
          adapter,
          entry: isProd ? "src/index.tsx" : "src/index.dev.tsx",
        }),
      ],
    };
  }
});
