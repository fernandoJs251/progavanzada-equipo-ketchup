import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_err, _req, res) => {
            // Evita el molesto stacktrace ECONNREFUSED en la consola si el backend está apagado
            if ('writeHead' in res && !res.headersSent) {
              res.writeHead(503, {
                'Content-Type': 'application/json'
              });
              res.end(JSON.stringify({
                error: 'Backend Flask no conectado en http://127.0.0.1:5000. Usando modo local.',
                offline: true
              }));
            }
          });
        }
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-vendor': ['lucide-react', 'recharts', 'canvas-confetti'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
