import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "../env";

/**
 * Service-role client. BYPASSES RLS. Use only in API routes, only after the
 * route has verified who the caller is and what they're allowed to do.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing environment variable SUPABASE_SERVICE_ROLE_KEY");
  return createClient(publicEnv.supabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
