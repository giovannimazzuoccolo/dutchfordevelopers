import {createClient, SupabaseClientOptions} from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

//TODO: https://stackoverflow.com/questions/67703133/how-to-use-env-variables-in-nuxt-2-or-3

// https://github.com/nuxt-modules/supabase/issues/188#issuecomment-1685095021
// this must be sufficient to use it on server side rendering.
const supabaseClientOptions: SupabaseClientOptions<any> = {
    auth :{
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
    }
}
export const supabase = createClient('https://atocevnylhajaxvgxolu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0b2Nldm55bGhhamF4dmd4b2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg4NDMwMDcsImV4cCI6MTk3NDQxOTAwN30.FbLLcBJf4jH8VOkhUx7CWS2lxtf2PceU5SNiT4633X4', supabaseClientOptions);

