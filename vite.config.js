import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Разводка мостов СПБ",
        short_name: "Разводка мостов СПБ",
        description: "Приложение для отслеживания времени до разводки мостов",
        theme_color: "#222",
        icons: [
          {
            src: "assets/bridge-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/bridge-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "assets/bridge-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
