/**
 * Server-side Supabase client
 * Use in Server Components, Server Actions, Route Handlers
 * Reads/writes cookies for session management
 *
 * NOTE: Uses `any` for DB generics until `supabase gen types typescript --local` is run.
 */
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component での set は無視（middleware が担当）
          }
        },
      },
    },
  );
}
