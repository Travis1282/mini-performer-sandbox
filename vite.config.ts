import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { parse } from 'smol-toml'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isProd = process.env.NODE_ENV === 'production'
  // const tomlPath = path.join(process.cwd(), 'wrangler.toml')
  // const contents = fs.readFileSync(tomlPath, 'utf-8')
  // const parsedToml = parse(contents)

  // console.log(parsedToml)

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
      // plugins: [react()],
      build: {
        minify: false,
        cssMinify: 'lightningcss',
        manifest: true,
        sourcemap: 'hidden',
        rollupOptions: {
          input: './src/client.tsx',
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
        target: 'es2020',
      },
    }
  } else {
    return {
      test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/services/testing/setupTests.ts',
      },
      ssr: {
        external: ['react', 'react-dom'],
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
