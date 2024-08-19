import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Change 'build' to your desired output directory name
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://web-production-63b2.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix when proxying
      }
    }
  }
});
