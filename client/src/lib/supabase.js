import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://muawocjipiwzinsuuzlx.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_iXKvZtzWJtK7qOOSRZTASA_2a4bt7Jw";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);