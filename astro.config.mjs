import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://yourusername.github.io',
  base: '/content-creator/',
  output: 'static',
});
