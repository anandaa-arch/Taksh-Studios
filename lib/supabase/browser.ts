import { createClient } from '@supabase/supabase-js';

/**
 * Client-side Supabase client using the anon (public) key.
 * Safe to use in browser — respects Row Level Security.
 * Used for public reads (products listing, etc.)
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
