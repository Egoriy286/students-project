import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/students': {
        ws: true,
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/lectures': {
        ws: true,
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/attendance': {
        ws: true,
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
