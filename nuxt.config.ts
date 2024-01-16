// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    supabaseUrl: "",
    supabaseKey: "",
    public: {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
    },
  },
  app: {
    head: {
      title: "Dutch for Developers",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@pinia/nuxt"],
});
