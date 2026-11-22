"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  CHECKIN_COOLDOWN_OPTIONS_MIN, CHECKIN_RADIUS_OPTIONS_M, formatWait,
} from "@localworx/shared";
import { createClient } from "@/lib/supabase/browser";
import { Spinner } from "@/components/spinner";

const PinPickerMap = dynamic(() => import("./map/pin-picker-map"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-paper-2" />,
});

type Result = { error: { message: string } | null };

// Every manage action: shows a spinner while it runs, then a success or error line.
function useAction() {
  const router = useRouter();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  async function run(fn: () => PromiseLike<Result>, ok: string): Promise<boolean> {
    setBusy(true);
    setMsg(null);
    let error: Result["error"];
    try {
      ({ error } = await fn());
    } catch {
      error = { message: "Couldn't reach the server. Check your connection and try again." };
    }
    setBusy(false);
    setMsg(error ? { ok: false, text: friendly(error.message) } : ok ? { ok: true, text: ok } : null);
    if (!error) router.refresh();
    return !error;
  }
  const Msg = () => (msg ? <p role={msg.ok ? "status" : "alert"} className={`mt-2 text-sm ${msg.ok ? "text-good" : "text-bad"}`}>{msg.ok ? "✓ " : ""}{msg.text}</p> : null);
  return { run, Msg, busy };
}

function friendly(m: string) {
  if (/row-level security|permission denied|not allowed/i.test(m)) return "You don't have permission to do that for this shop.";
  if (/check constraint|violates/i.test(m)) return "One of those values isn't allowed. Check the form and try again.";
  return m;
}

function Submit({ busy, children, busyText = "Saving…", className = "btn-dark" }: { busy: boolean; children: React.ReactNode; busyText?: string; className?: string }) {
  return (
    <button className={className} disabled={busy} aria-busy={busy}>
      {busy ? <><Spinner /> {busyText}</> : children}
    </button>
  );
}

export function RedeemBox() {
  const { run, Msg, busy } = useAction();
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => {
      e.preventDefault();
      const raw = String(new FormData(e.currentTarget).get("code")).trim();
      const id = raw.replace(/^localworx:reward:/, "");
      run(() => createClient().rpc("redeem_reward", { p_reward: id }), "Reward used. Enjoy!");
    }}>
      <input name="code" required className="field" placeholder="localworx:reward:…" />
      <Submit busy={busy} busyText="Checking…" className="btn-dark shrink-0">Use</Submit>
      <Msg />
    </form>
  );
}

export function ProgramForm({ businessId, current }: {
  businessId: string;
  current: { id: string; name: string; description: string; visits_required: number } | null;
}) {
  const { run, Msg, busy } = useAction();
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
      <Submit busy={busy}>{current ? "Update punch card" : "Start punch card"}</Submit>
      {current && <p className="text-xs text-muted">Changing it starts everyone&apos;s card over. Rewards already earned still work.</p>}
      <Msg />
    </form>
  );
}

type PayKind = "sats" | "inkind" | "both";
const PAY_OPTIONS: [PayKind, string, string][] = [
  ["inkind", "Something from my shop", "A meal, a haircut, a coffee. The promoter gets an IOU they can use or sell for sats."],
  ["sats", "Sats", "Paid straight to the promoter's Lightning address. Quick and simple."],
  ["both", "Both", "Sats per visit, plus an item."],
];

export function PromotionForm({ businessId }: { businessId: string }) {
  const { run, Msg, busy } = useAction();
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState<PayKind>("inkind");
  if (!open) return <button className="btn-ghost mt-4 !py-2 text-sm" onClick={() => setOpen(true)}>New promotion</button>;
  const withSats = pay !== "inkind";
  const withItem = pay !== "sats";
  return (
    <form className="mt-4 space-y-3 border-t border-line pt-4" onSubmit={async (e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const ok = await run(() => createClient().from("promotions").insert({
        business_id: businessId,
        title: String(f.get("title")),
        body: String(f.get("body") ?? ""),
        terms: String(f.get("terms") ?? "") || null,
        sats_per_visit: withSats ? Number(f.get("sats")) : 0,
        inkind_item: withItem ? String(f.get("item")) : null,
        inkind_details: withItem ? String(f.get("item_details") ?? "") || null : null,
        inkind_visits: withItem ? Number(f.get("item_visits")) : 1,
      }), "Promotion posted.");
      if (ok) setOpen(false);
    }}>
      <input name="title" required minLength={3} maxLength={120} placeholder="Bring a friend to Joe's" className="field" />
      <textarea name="body" rows={3} maxLength={4000} placeholder="What should promoters tell people?" className="field" />
      <fieldset>
        <legend className="label">How you pay promoters</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {PAY_OPTIONS.map(([v, label, hint]) => (
            <label key={v} className={`cursor-pointer rounded-xl border p-3 text-sm ${pay === v ? "border-orange bg-orange-light/40" : "border-line bg-white"}`}>
              <span className="flex items-center gap-2 font-semibold">
                <input type="radio" name="pay" value={v} checked={pay === v} onChange={() => setPay(v)} /> {label}
              </span>
              <span className="mt-1 block text-xs text-muted">{hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {withItem && (
        <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
          <label className="block"><span className="label">What you give</span>
            <input name="item" required minLength={2} maxLength={80} placeholder="Free haircut" className="field" /></label>
          <label className="block"><span className="label">Every how many visits</span>
            <input name="item_visits" type="number" min={1} max={100} required defaultValue={1} className="field" /></label>
          <label className="block sm:col-span-2"><span className="label">Details (optional)</span>
            <input name="item_details" maxLength={500} placeholder="Any cut, tip not included" className="field" /></label>
        </div>
      )}
      {withSats && (
        <label className="block"><span className="label">Sats you pay the promoter per visit they send</span>
          <input name="sats" type="number" min={1} max={1000000} required defaultValue={500} className="field" /></label>
      )}
      {withItem && (
        <p className="rounded-xl bg-paper-2 p-3 text-xs text-ink-2">
          Each one is an IOU covered by your honor pledge. The promoter owns it: they can use it, give it away, or sell it on the
          marketplace, so honor it for whoever brings it in.
        </p>
      )}
      <input name="terms" maxLength={2000} placeholder="Terms (optional)" className="field" />
      <Submit busy={busy} busyText="Posting…">Post promotion</Submit>
      <Msg />
    </form>
  );
}

export function PromotionToggle({ id, active }: { id: string; active: boolean }) {
  const { run, busy } = useAction();
  return (
    <button className="text-xs font-semibold text-orange-dark hover:underline disabled:opacity-50" disabled={busy}
      onClick={() => run(() => createClient().from("promotions").update({ is_active: !active }).eq("id", id), "")}>
      {busy ? <Spinner /> : active ? "Pause" : "Resume"}
    </button>
  );
}

export function ClaimActions({ claimId }: { claimId: string }) {
  const { run, busy } = useAction();
  const set = (status: "approved" | "rejected") =>
    run(() => createClient().from("promotion_claims").update({ status }).eq("id", claimId), "");
  return (
    <div className="flex gap-2">
      <button className="btn-dark !px-3 !py-1.5 text-sm" disabled={busy} onClick={() => set("approved")}>{busy ? <Spinner /> : "Approve"}</button>
      <button className="btn-ghost !px-3 !py-1.5 text-sm" disabled={busy} onClick={() => set("rejected")}>Decline</button>
    </div>
  );
}

const radiusLabel = (m: number) =>
  m <= 30 ? "30 m · small shop" : m <= 60 ? "60 m · most shops (default)" : m <= 100 ? "100 m · large store"
  : m <= 150 ? "150 m · big store or plaza" : "250 m · market, fair, campus";

export function CheckinRulesForm({ businessId, current }: {
  businessId: string;
  current: { lat: number; lng: number; checkin_radius_m: number; checkin_cooldown_minutes: number };
}) {
  const { run, Msg, busy } = useAction();
  const [pin, setPin] = useState({ lat: current.lat, lng: current.lng });
  const [radius, setRadius] = useState(current.checkin_radius_m);
  const [cooldown, setCooldown] = useState(current.checkin_cooldown_minutes);
  const dirty = pin.lat !== current.lat || pin.lng !== current.lng || radius !== current.checkin_radius_m || cooldown !== current.checkin_cooldown_minutes;
  return (
    <form className="mt-4 space-y-4" onSubmit={(e) => {
      e.preventDefault();
      run(() => createClient().from("businesses").update({
        lat: pin.lat, lng: pin.lng, checkin_radius_m: radius, checkin_cooldown_minutes: cooldown,
      }).eq("id", businessId), "Check-in rules saved.");
    }}>
      <div>
        <PinPickerMap lat={pin.lat} lng={pin.lng} radius={radius} onMove={(lat, lng) => setPin({ lat, lng })} />
        <p className="mt-1.5 text-xs text-muted">
          Drag the pin to where your counter QR stands. Customers can check in anywhere inside the circle.
          Phone GPS can be off by 20–50 m indoors, so if regulars get &quot;you&apos;re too far away&quot;, widen it.
        </p>
      </div>
      <label className="block"><span className="label">Check-in radius</span>
        <select className="field" value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
          {CHECKIN_RADIUS_OPTIONS_M.map((m) => <option key={m} value={m}>{radiusLabel(m)}</option>)}
        </select>
        <span className="mt-1 block text-xs text-muted">Wider is more forgiving but easier to fake from a photo of the code. Keep it as small as works.</span>
      </label>
      <label className="block"><span className="label">A visit counts once every</span>
        <select className="field" value={cooldown} onChange={(e) => setCooldown(Number(e.target.value))}>
          {CHECKIN_COOLDOWN_OPTIONS_MIN.map((m) => <option key={m} value={m}>{formatWait(m)}{m === 180 ? " (default)" : ""}</option>)}
        </select>
        <span className="mt-1 block text-xs text-muted">Stops someone at the counter from filling a punch card, or earning promoter payouts, by scanning over and over. A coffee shop might pick 1 h; a restaurant 3 h.</span>
      </label>
      <Submit busy={busy}>Save check-in rules</Submit>{dirty && !busy && <span className="ml-3 text-xs text-muted">Unsaved changes</span>}
      <Msg />
    </form>
  );
}
