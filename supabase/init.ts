import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
    'https://atocevnylhajaxvgxolu.supabase.co'
const supabaseAnonKey =
    'R9AjKFGZAC790nLbgUsnHVA14bfKMdxb0qOPuUrVAObT3JdVoa5FEDeQYIDLa3QRdzIWHt138D/ggAuabZS5TA=='

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
)
