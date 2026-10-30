import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
<<<<<<< HEAD
    // Proxy API requests to Spring Cloud Gateway on port 8090
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      },
      '/content': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      },
      '/access': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      },
      '/usage': {
        target: 'http://localhost:8090',
=======
    // Proxy API requests during development to avoid CORS issues with the backend
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
>>>>>>> ac01a7e2003287589498a96922d12f091ddd2f03
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
