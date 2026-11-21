"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

function useAction() {
  const router = useRouter();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  async function run(fn: () => PromiseLike<{ error: { message: string } | null }>, ok: string) {
    const { error } = await fn();
    setMsg(error ? { ok: false, text: error.message } : { ok: true, text: ok });
    if (!error) router.refresh();
  }
  const Msg = () => (msg ? <p className={`mt-2 text-sm ${msg.ok ? "text-good" : "text-bad"}`}>{msg.text}</p> : null);
  return { run, Msg };
}

export function RedeemBox() {
  const { run, Msg } = useAction();
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => {
      e.preventDefault();
      const raw = String(new FormData(e.currentTarget).get("code")).trim();
      const id = raw.replace(/^localworx:reward:/, "");
      run(() => createClient().rpc("redeem_reward", { p_reward: id }), "Reward used. Enjoy!");
    }}>
      <input name="code" required className="field" placeholder="localworx:reward:…" />
      <button className="btn-dark shrink-0">Use</button>
      <Msg />
    </form>
  );
}

export function ProgramForm({ businessId, current }: {
  businessId: string;
  current: { id: string; name: string; description: string; visits_required: number } | null;
}) {
  const { run, Msg } = useAction();
  return (
    <form className="mt-4 space-y-3" onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const supabase = createClient();
      run(async () => {
        // Replace: retire the old card, start a new one (existing rewards stay valid).
        if (current) {
          const r = await supabase.from("reward_programs").update({ is_active: false }).eq("id", current.id);
          if (r.error) return r;
        }
        return supabase.from("reward_programs").insert({
          business_id: businessId,
          name: String(f.get("name")),
          description: String(f.get("description") ?? ""),
          visits_required: Number(f.get("visits")),
        });
      }, "Punch card saved.");
    }}>
      <label className="block"><span className="label">Reward</span>
        <input name="name" required minLength={2} maxLength={80} defaultValue={current?.name} placeholder="Free latte" className="field" /></label>
      <label className="block"><span className="label">Visits to earn it</span>
        <input name="visits" type="number" min={1} max={100} required defaultValue={current?.visits_required ?? 5} className="field" /></label>
      <label className="block"><span className="label">Details (optional)</span>
        <input name="description" maxLength={500} defaultValue={current?.description} placeholder="Any size, any drink" className="field" /></label>
      <button className="btn-dark">{current ? "Update punch card" : "Start punch card"}</button>
      {current && <p className="text-xs text-muted">Changing it starts everyone&apos;s card over. Rewards already earned still work.</p>}
      <Msg />
    </form>
  );
}

export function PromotionForm({ businessId }: { businessId: string }) {
  const { run, Msg } = useAction();
  const [open, setOpen] = useState(false);
  if (!open) return <button className="btn-ghost mt-4 !py-2 text-sm" onClick={() => setOpen(true)}>New promotion</button>;
  return (
    <form className="mt-4 space-y-3 border-t border-line pt-4" onSubmit={(e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      run(() => createClient().from("promotions").insert({
        business_id: businessId,
        title: String(f.get("title")),
        body: String(f.get("body") ?? ""),
        terms: String(f.get("terms") ?? "") || null,
        sats_per_visit: Number(f.get("sats")),
      }), "Promotion posted.");
      setOpen(false);
    }}>
      <input name="title" required minLength={3} maxLength={120} placeholder="Bring a friend to Joe's" className="field" />
      <textarea name="body" rows={3} maxLength={4000} placeholder="What should promoters tell people?" className="field" />
      <label className="block"><span className="label">Sats you pay the promoter per new visit</span>
        <input name="sats" type="number" min={0} max={1000000} defaultValue={500} className="field" /></label>
      <input name="terms" maxLength={2000} placeholder="Terms (optional)" className="field" />
      <button className="btn-dark">Post promotion</button>
      <Msg />
    </form>
  );
}

export function PromotionToggle({ id, active }: { id: string; active: boolean }) {
  const { run } = useAction();
  return (
    <button className="text-xs font-semibold text-orange-dark hover:underline"
      onClick={() => run(() => createClient().from("promotions").update({ is_active: !active }).eq("id", id), "")}>
      {active ? "Pause" : "Resume"}
    </button>
  );
}

export function ClaimActions({ claimId }: { claimId: string }) {
  const { run } = useAction();
  const set = (status: "approved" | "rejected") =>
    run(() => createClient().from("promotion_claims").update({ status }).eq("id", claimId), "");
  return (
    <div className="flex gap-2">
      <button className="btn-dark !px-3 !py-1.5 text-sm" onClick={() => set("approved")}>Approve</button>
      <button className="btn-ghost !px-3 !py-1.5 text-sm" onClick={() => set("rejected")}>Decline</button>
    </div>
  );
}
