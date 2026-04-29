/**
 * Browser-side Supabase client
 * Use in Client Components ('use client')
 *
 * NOTE: Uses `any` for DB generics until `supabase gen types typescript --local` is run.
 */
import { createBrowserClient } from '@supabase/ssr';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createClient() {
  return createBrowserClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
