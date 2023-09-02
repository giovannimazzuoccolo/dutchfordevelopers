import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

//TODO: https://stackoverflow.com/questions/67703133/how-to-use-env-variables-in-nuxt-2-or-3
export const supabase = createClient(supabaseUrl, supabaseKey);