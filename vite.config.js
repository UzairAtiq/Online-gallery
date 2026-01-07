import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy, options) => {
          // If Vercel dev server is not running, this will fail gracefully
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error - make sure Vercel dev server is running on port 3000')
            res.writeHead(500, {
              'Content-Type': 'application/json',
            })
            res.end(JSON.stringify({ 
              error: 'API server not available. Run "vercel dev" in a separate terminal.' 
            }))
          })
        }
      }
    }
  }
})
