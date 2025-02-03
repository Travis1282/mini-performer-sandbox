import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isProd = process.env.NODE_ENV === 'production'

  if (mode === 'client') {
    return {
      test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/services/testing/setupTests.ts',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      plugins: [legacy()],
      build: {
        cssMinify: 'lightningcss',
        manifest: true,
        sourcemap: 'hidden',
        rollupOptions: {
          input: './src/client.tsx',
        },
        target: 'es2020',
      },
    }
  } else {
    return {
      logLevel: 'info',
      test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/services/testing/setupTests.ts',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      plugins: [
        build(),
        devServer({
          adapter,
          entry: isProd ? 'src/index.tsx' : 'src/index.dev.tsx',
        }),
      ],
    }
  }
})
