import devServer from '@hono/vite-dev-server';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    devServer({
      entry: 'src/index.dev.tsx',
    }),
  ],
});
