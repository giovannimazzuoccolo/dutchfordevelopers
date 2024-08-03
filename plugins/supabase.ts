import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  // with local key:
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  let supabase;

  if (process.env.NODE_ENV === "development") {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey,
    );
  }
  nuxtApp.provide("supabase", supabase);
});
