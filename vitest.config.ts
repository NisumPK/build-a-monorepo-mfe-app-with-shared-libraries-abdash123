import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test.setup.ts'],
  },
  resolve: {
    alias: {
      '@mfe/types': path.resolve(__dirname, './libs/types/src/index.ts'),
      '@mfe/ui': path.resolve(__dirname, './libs/ui/src/index.ts'),
    },
  },
});
