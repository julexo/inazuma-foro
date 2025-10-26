// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// Lee las variables de entorno que configuraste
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Crea y exporta el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)