import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
// HTTPS is enabled by vite-plugin-mkcert: the Geolocation API used by the app
// requires a secure context, which `localhost` over plain HTTP does not provide
// on every browser.
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icon.png'],
      manifest: {
        name: 'WC Locator',
        description: 'Les toilettes publiques des grandes villes de France',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-64x64.svg',
            sizes: '64x64',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
