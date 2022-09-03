import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js'
      })
    ]
    // ,
    // build: {
    //     // generate manifest.json in outDir
    //     manifest: true,
    //     rollupOptions: {
    //         // overwrite default .html entry
    //         input: 'js/main.js'
    //       }
    // }
})