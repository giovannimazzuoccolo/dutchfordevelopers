// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {},

  app: {
    head: {
      title: "Dutch for Developers",
    },
  },

  plugins: ["~/plugins/autoAuth.ts", "~/plugins/prisma.ts"],
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@pinia/nuxt", "@sidebase/nuxt-auth"],
  compatibilityDate: "2024-08-14",
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/css/main.css"],
});
