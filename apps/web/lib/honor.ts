import "server-only";
import type { createClient } from "@/lib/supabase/server";

type Client = Awaited<ReturnType<typeof createClient>>;
export type Unhonored = { open_reports: number; oldest: string };

/** Shops with an IOU report still open past the grace period: they carry the "Unpaid IOU" badge. */
export async function getUnhonored(supabase: Client): Promise<Map<string, Unhonored>> {
  const { data } = await supabase.rpc("unhonored_businesses");
  return new Map(((data ?? []) as ({ business_id: string } & Unhonored)[]).map((r) => [r.business_id, r]));
}
