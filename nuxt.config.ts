// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
export default defineNuxtConfig({
  runtimeConfig: {},
  auth: {
    provider: {
      type: "authjs",
    },
  },
  app: {
    head: {
      title: "Dutch for Developers",
    },
  },

  plugins: ["~/plugins/prisma.server.ts"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/icon",
    //  "@netlify/nuxt",
  ],
  nitro: {
    alias: {
      // next-auth ships core/index.js on disk but does not expose the
      // "./core" subpath in its exports map, so resolve it absolutely.
      "next-auth/core": fileURLToPath(
        new URL("./node_modules/next-auth/core/index.js", import.meta.url),
      ),
    },
  },
  compatibilityDate: "2024-08-14",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
  },
  css: ["./app/assets/css/main.css"],
});
