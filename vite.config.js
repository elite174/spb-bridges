import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "robots.txt", "bridge-180x180.png"],
      manifest: {
        name: "Разводка мостов СПБ",
        short_name: "Мосты СПБ",
        description: "Приложение для отслеживания времени до разводки мостов",
        theme_color: "#222222",
        background_color: "#222222",
        icons: [
          {
            src: "bridge-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "bridge-512x512.png",
            sizes: "512x512",
            type: "image/png",
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
