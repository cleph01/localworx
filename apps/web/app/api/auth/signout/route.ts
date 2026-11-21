import { createClient } from "@/lib/supabase/server";
import { json } from "@/lib/auth";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return json({ ok: true });
}
