import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@react-three/fiber', '@react-three/drei'],
    force: true,
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, _res) => {
            console.log('proxy error', err);
            // #region agent log
            // Note: This runs in Node.js context, so we can't use fetch. We'll log via console and the user can check terminal.
            console.log('[AGENT LOG] proxy error:', JSON.stringify({location:'vite.config.ts:proxy-error',message:'Proxy error occurred',data:{error:err.message,url:req?.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'}));
            // #endregion
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            const targetUrl = `http://localhost:3000${req.url}`;
            console.log('Sending Request to the Target:', req.method, req.url, '->', targetUrl);
            // #region agent log
            console.log('[AGENT LOG] proxy request:', JSON.stringify({location:'vite.config.ts:proxy-req',message:'Proxy forwarding request',data:{method:req.method,originalUrl:req.url,target:'http://localhost:3000',finalUrl:targetUrl},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'}));
            // #endregion
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            // #region agent log
            console.log('[AGENT LOG] proxy response:', JSON.stringify({location:'vite.config.ts:proxy-res',message:'Proxy received response',data:{statusCode:proxyRes.statusCode,url:req.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'}));
            // #endregion
          });
        },
      },
    },
  },
})
