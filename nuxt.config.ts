// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
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

  plugins: ["~/plugins/autoAuth.ts", "~/plugins/prisma.ts"],
  devtools: { enabled: true },
  modules: [
    "@nuxt/content",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/icon",
    //  "@netlify/nuxt",
  ],
  compatibilityDate: "2024-08-14",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [],
    },
  },
  css: ["./app/assets/css/main.css"],
  nitro: {
    preset: "netlify",
  },
});
