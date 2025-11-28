import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  plugins: [
    react(),
    mdx({
      jsxImportSource: 'react',
    }),
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Ensure proper build output
    outDir: 'dist',
    assetsDir: 'assets',
    // Copy public files including CNAME
    copyPublicDir: true,
  },
  optimizeDeps: {
    include: ['@mdx-js/react']
  }
})
