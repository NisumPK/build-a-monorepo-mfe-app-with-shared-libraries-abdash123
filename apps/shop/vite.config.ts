import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    federation({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': path.resolve(__dirname, 'src/components/ProductList.tsx'),
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
    port: 4201,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 4201,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    outDir: '../../dist/apps/shop',
    emptyOutDir: true,
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
