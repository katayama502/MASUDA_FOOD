/**
 * Supabase Admin client (service_role)
 * ⚠️ NEVER expose on the client side.
 * Use only in Route Handlers and Server Actions that need to bypass RLS.
 *
 * NOTE: Uses `any` for DB generics until `supabase gen types typescript --local` is run.
 */
import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseAdmin = ReturnType<typeof createClient<any>>;

let _adminClient: SupabaseAdmin | null = null;

export function createAdminClient(): SupabaseAdmin {
  if (!_adminClient) {
    _adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }
  return _adminClient;
}
