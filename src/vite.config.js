import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        movies: resolve(__dirname, "movies/index.html"),
      },
    },
  },

  plugins: [
    VitePWA({
      injectManifest: true,
    }),
  ],
});
