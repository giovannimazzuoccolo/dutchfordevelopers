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
    // if production is https://www.dutchfordevelopers.com/api/auth, for dev it would be http://localhost:3000/api/auth
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://www.dutchfordevelopers.com/api/auth"
        : "http://localhost:3000/api/auth",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/assets/css/main.css"],
  nitro: {
    preset: "netlify",
  },
});
