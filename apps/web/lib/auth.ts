import "server-only";
import { createClient as createUserClient } from "@supabase/supabase-js";
import { createClient } from "./supabase/server";
import { publicEnv } from "./env";

/**
 * Who is calling? Web requests carry the session cookie; the mobile app sends
 * `Authorization: Bearer <access token>`. Either way Supabase verifies the token.
 * Returns the user id and a client that acts as that user (RLS applies).
 */
export async function getRequestUser(req?: Request) {
  const bearer = req?.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (bearer) {
    const supabase = createUserClient(publicEnv.supabaseUrl(), publicEnv.supabaseAnonKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${bearer}` } },
    });
    const { data } = await supabase.auth.getUser(bearer);
    return data.user ? { userId: data.user.id, supabase } : null;
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user ? { userId: data.user.id, supabase } : null;
}

/** For Server Components: the signed-in user's profile, or null. */
export async function getCurrentProfile() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, pubkey, display_name, picture_url, lightning_address")
    .eq("id", data.user.id)
    .single();
  return profile;
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}
