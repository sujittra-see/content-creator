import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  define: {
    'import.meta.env.BASE_URL': JSON.stringify('/content-creator/'),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts'],
  },
});
