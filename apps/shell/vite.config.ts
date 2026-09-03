import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        shop: 'http://localhost:4201/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@mfe/types': path.resolve(__dirname, '../../libs/types/src/index.ts'),
      '@mfe/ui': path.resolve(__dirname, '../../libs/ui/src/index.ts'),
    },
  },
  server: {
    port: 4200,
    cors: true,
  },
  preview: {
    port: 4200,
    cors: true,
  },
  build: {
    outDir: '../../dist/apps/shell',
    emptyOutDir: true,
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
