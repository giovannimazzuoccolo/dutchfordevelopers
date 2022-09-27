import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
    'https://atocevnylhajaxvgxolu.supabase.co'
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0b2Nldm55bGhhamF4dmd4b2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTg4NDMwMDcsImV4cCI6MTk3NDQxOTAwN30.FbLLcBJf4jH8VOkhUx7CWS2lxtf2PceU5SNiT4633X4'

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
)
