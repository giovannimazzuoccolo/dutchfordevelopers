// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  srcDir: "app",
  runtimeConfig: {},

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
  ],
  compatibilityDate: "2024-08-14",
  auth: {
    baseURL: "api/auth",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/css/main.css"],
  nitro: {
    preset: "netlify",
  },
});
