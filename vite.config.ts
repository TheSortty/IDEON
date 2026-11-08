import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Al terminar `vite build`, genera un HTML estático por ruta (sitio MPA).
// Va como plugin y no como paso aparte del script de npm para que corra igual
// la invoque quien la invoque (npm run build/preview/deploy o un build de
// Cloudflare). La lógica vive en scripts/prerender.mjs.
function prerenderPlugin(): Plugin {
  let outDir = path.resolve(__dirname, 'dist');
  return {
    name: 'ideon:prerender',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      // Solo después del build del cliente (el que deja index.html).
      if (this.environment && this.environment.name !== 'client') return;
      const { prerender } = await import('./scripts/prerender.mjs');
      await prerender(outDir);
    },
  };
}

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), cloudflare(), prerenderPlugin()],
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
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})