// https://nuxt.com/docs/api/configuration/nuxt-config
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
});
