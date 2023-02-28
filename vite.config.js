import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'


// https://vitejs.dev/config/
export default defineConfig({
    server: {https: true},
    plugins: [
        react(),
        mkcert(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'WC Locator',
                description: 'Les toilettes publiques des grandes villes de france',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: '64x64',
                        type: 'image/svg+xml',
                        purpose: "any maskable"
                    },
                    {
                        src: 'icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: "any maskable"
                    }
                ]
            }
        }),
    ]
})
