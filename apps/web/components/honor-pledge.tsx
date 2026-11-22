"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HONOR_PLEDGE_CHECKBOX, HONOR_PLEDGE_POINTS } from "@localworx/shared";
import { createClient } from "@/lib/supabase/browser";
import { Spinner } from "@/components/spinner";

// The pledge text plus a required checkbox. Used inside the new-business form (name="pledge").
export function HonorPledgeFields() {
  return (
    <div className="rounded-xl border border-orange/40 bg-orange-light/30 p-4">
      <p className="font-semibold">The LocalWorx honor pledge</p>
      <p className="mt-1 text-sm text-ink-2">
        Rewards and in-kind payouts are IOUs from your shop. People earn them, trade them and sell them to each
        other, so they only work if they&apos;re always honored.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
        {HONOR_PLEDGE_POINTS.map((t) => (
          <li key={t} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />{t}</li>
        ))}
      </ul>
      <label className="mt-4 flex items-start gap-2 text-sm font-medium">
        <input type="checkbox" name="pledge" required className="mt-0.5" /> {HONOR_PLEDGE_CHECKBOX}
      </label>
    </div>
  );
}

// For shops listed before the pledge existed: sign it from the manage page.
export function HonorPledgeForm({ businessId }: { businessId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <form className="space-y-3" onSubmit={async (e) => {
      e.preventDefault();
      setBusy(true);
      setError(null);
      const { error } = await createClient().rpc("sign_honor_pledge", { p_business: businessId });
      setBusy(false);
      if (error) setError(/not allowed/i.test(error.message) ? "Only the owner can sign the pledge." : error.message);
      else router.refresh();
    }}>
      <HonorPledgeFields />
      <button className="btn-primary" disabled={busy}>{busy ? <><Spinner /> Signing…</> : "Sign the pledge"}</button>
      {error && <p role="alert" className="text-sm text-bad">{error}</p>}
    </form>
  );
}
