import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    open: '/demo/index.html',
    watch: {
      usePolling: true,
    },
    cors: true,
    port: 8080,
  },
});
