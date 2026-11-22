"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase/browser";
import { withTown } from "@localworx/shared";

type Props = {
  reward: {
    id: string; status: string; name: string; details?: string | null; kind?: string;
    business: { name: string; slug: string; city?: string };
  };
  listing: { id: string; price_sats: number } | null;
  /** An open "they wouldn't honor this" report the viewer filed on this reward. */
  report?: { id: string } | null;
};

export function RewardCard({ reward, listing, report }: Props) {
  const [show, setShow] = useState(false);
  const [selling, setSelling] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  return (
    <div className="card flex flex-col p-5">
      <p className="text-sm text-muted">{withTown(reward.business.name, reward.business.city)}</p>
      <p className="h-display mt-1 text-xl">{reward.name}</p>
      {reward.details && <p className="mt-0.5 text-sm text-muted">{reward.details}</p>}
      {reward.kind === "promoter_payout" && <p className="mt-1 text-xs font-semibold text-slate">Earned promoting this shop</p>}
      {report ? (
        <div className="mt-2 rounded-xl bg-bad/10 p-3 text-sm text-bad">
          You reported that the shop wouldn&apos;t honor this.
          <button className="ml-1 font-semibold underline" onClick={async () => {
            const { error } = await supabase.rpc("close_honor_report", { p_report: report.id });
            if (error) setError(error.message); else router.refresh();
          }}>They made it right</button>
        </div>
      ) : listing ? (
        <p className="mt-2 text-sm font-semibold text-orange-dark">For sale · {listing.price_sats.toLocaleString()} sats</p>
      ) : (
        <p className="mt-2 text-sm text-good">Ready to use</p>
      )}

      {show && (
        <div className="mt-4 grid place-items-center rounded-xl bg-white p-4 ring-1 ring-line">
          <QRCodeSVG value={`localworx:reward:${reward.id}`} size={180} />
          <p className="mt-2 text-center text-xs text-muted">Staff scan this to mark it used. It works once.</p>
        </div>
      )}

      {selling && (
        <form className="mt-4 space-y-2" onSubmit={async (e) => {
          e.preventDefault();
          const price = Number(new FormData(e.currentTarget).get("price"));
          const { error } = await supabase.rpc("list_reward", { p_reward: reward.id, p_price: price });
          if (error) setError(error.message); else { setSelling(false); router.refresh(); }
        }}>
          <label className="label" htmlFor={`p-${reward.id}`}>Price in sats</label>
          <input id={`p-${reward.id}`} name="price" type="number" min={1} max={10000000} required className="field" placeholder="2500" />
          <p className="text-xs text-muted">Buyers pay your Lightning address directly. Set one in Profile & wallet.</p>
          <button className="btn-dark w-full">List for sale</button>
        </form>
      )}
      {reporting && (
        <form className="mt-4 space-y-2" onSubmit={async (e) => {
          e.preventDefault();
          const note = String(new FormData(e.currentTarget).get("note") ?? "");
          const { error } = await supabase.rpc("report_unhonored", { p_reward: reward.id, p_note: note });
          if (error) setError(error.message); else { setReporting(false); router.refresh(); }
        }}>
          <p className="text-sm text-ink-2">
            Every shop on LocalWorx pledges to honor its rewards and IOUs. Tell us what happened. The shop has 7 days to make it
            right before its page shows an &quot;Unpaid IOU&quot; badge. Close the report once they do.
          </p>
          <textarea name="note" rows={2} maxLength={500} className="field" placeholder="What happened? (optional)" />
          <button className="btn-dark w-full">Report it</button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-bad">{error}</p>}

      <div className="mt-auto flex gap-2 pt-5">
        {listing ? (
          <button className="btn-ghost flex-1 !py-2 text-sm" onClick={async () => {
            const { error } = await supabase.rpc("cancel_listing", { p_listing: listing.id });
            if (error) setError(error.message); else router.refresh();
          }}>Take off market</button>
        ) : (
          <>
            <button className="btn-primary flex-1 !py-2 text-sm" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Use it"}</button>
            <button className="btn-ghost flex-1 !py-2 text-sm" onClick={() => setSelling((s) => !s)}>Sell</button>
          </>
        )}
      </div>
      {!listing && !report && (
        <button className="mt-3 self-start text-xs text-muted underline hover:text-bad" onClick={() => setReporting((r) => !r)}>
          {reporting ? "Never mind" : "Shop won't honor this?"}
        </button>
      )}
    </div>
  );
}

// For a used reward whose report is still open (a shop marking it used doesn't close it).
export function CloseReportButton({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button className="text-xs font-semibold text-bad underline disabled:opacity-50" disabled={busy} onClick={async () => {
      setBusy(true);
      const { error } = await createClient().rpc("close_honor_report", { p_report: reportId });
      setBusy(false);
      if (!error) router.refresh();
    }}>Reported · they made it right</button>
  );
}
