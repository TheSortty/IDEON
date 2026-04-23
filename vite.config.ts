import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), cloudflare()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})