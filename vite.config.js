import { defineConfig } from 'vite'

export default defineConfig({
  base: '/webp-converter/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
