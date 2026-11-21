"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browser";

export function ClaimButton({ promotionId, signedIn }: { promotionId: string; signedIn: boolean }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  if (!signedIn) return <Link href="/signin" className="text-sm font-semibold text-orange-dark hover:underline">Sign in to promote this →</Link>;
  if (state === "done") return <p className="text-sm text-good">Requested! You&apos;ll get your link once the shop approves. See <Link className="underline" href="/me/promoting">Promoting</Link>.</p>;
  return (
    <button className="btn-ghost !py-1.5 text-sm" disabled={state === "busy"} onClick={async () => {
      setState("busy");
      const supabase = createClient();
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("promotion_claims").insert({ promotion_id: promotionId, promoter_id: u.user!.id });
      setState(error && !/duplicate/i.test(error.message) ? "error" : "done");
    }}>
      {state === "error" ? "Try again" : "Promote this"}
    </button>
  );
}
