import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  debugger;
  const supabase = createClient(config.supabaseUrl, config.supabaseKey);
  nuxtApp.provide("supabase", supabase);
});
