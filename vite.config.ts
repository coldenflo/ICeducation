// vite.config.js или vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Запросы к /api будут перенаправляться на ваш Flask сервер
      '/api': {
        target: 'http://localhost:5001', // Адрес вашего Flask-сервера
        changeOrigin: true, // Необходимо для виртуальных хостов
        // Можно убрать /api из пути при перенаправлении, если ваш Flask ожидает /notify, а не /api/notify
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    }
  }
})