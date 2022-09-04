import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
    // base: '', 
    build: {
        outDir: '../dist'
    },
    
    plugins: [
        VitePWA({
            injectManifest: true
        })
    ]
})