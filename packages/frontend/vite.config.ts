import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'shared': '../shared/',
      '@app': '/src/app',
      '@components': '/src/components',
      '@features': '/src/features',
      '@layout': '/src/layout',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
    },
  },
});