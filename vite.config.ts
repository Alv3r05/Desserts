import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // json-server rewrites db.json on every change, which would reload the page and hide toasts
      ignored: ['**/db.json'],
    },
  },
})
