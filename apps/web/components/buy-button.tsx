"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

type WebLN = { enable(): Promise<void>; sendPayment(pr: string): Promise<{ preimage: string }> };

export function BuyButton({ listingId, signedIn }: { listingId: string; signedIn: boolean }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "invoice" | "done" | "error">("idle");
  const [sale, setSale] = useState<{ sale_id: string; invoice: string; can_auto_verify: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  async function confirm(saleId: string, preimage?: string) {
    const res = await fetch(`/api/sales/${saleId}/confirm`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ preimage }),
    });
    const data = await res.json();
    if (data.status === "settled") {
      if (poll.current) clearInterval(poll.current);
      setPhase("done");
      return true;
    }
    if (!res.ok && res.status !== 202) { setError(data.error); setPhase("error"); }
    return false;
  }

  async function start() {
    setPhase("loading");
    setError(null);
    const res = await fetch(`/api/listings/${listingId}/buy`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) { setError(data.error); setPhase("error"); return; }
    setSale(data);
    setPhase("invoice");

    // Browser wallet (e.g. Alby extension) pays in one click and hands back the proof.
    const webln = (window as unknown as { webln?: WebLN }).webln;
    if (webln) {
      try {
        await webln.enable();
        const { preimage } = await webln.sendPayment(data.invoice);
        if (await confirm(data.sale_id, preimage)) return;
      } catch { /* user closed the wallet prompt: fall back to QR */ }
    }
    if (data.can_auto_verify) poll.current = setInterval(() => confirm(data.sale_id), 3000);
  }

  if (!signedIn) return <Link href="/signin?next=/marketplace" className="btn-dark w-full">Sign in to buy</Link>;
  if (phase === "done") return <p className="rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">Paid! It&apos;s in <Link className="underline" href="/me">your rewards</Link>.</p>;
  if (phase === "invoice" && sale) {
    return (
      <div className="space-y-3">
        <div className="grid place-items-center rounded-xl bg-white p-3 ring-1 ring-line">
          <QRCodeSVG value={`lightning:${sale.invoice}`} size={200} />
        </div>
        <p className="text-center text-xs text-muted">Scan with any Lightning wallet. This listing is held for you for 10 minutes.</p>
        <div className="flex gap-2">
          <a href={`lightning:${sale.invoice}`} className="btn-primary flex-1 !py-2 text-sm">Open wallet</a>
          <button className="btn-ghost flex-1 !py-2 text-sm" onClick={() => navigator.clipboard.writeText(sale.invoice)}>Copy invoice</button>
        </div>
        {!sale.can_auto_verify && (
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); confirm(sale.sale_id, String(new FormData(e.currentTarget).get("pre")).trim()); }}>
            <input name="pre" placeholder="Payment proof (preimage)" className="field !py-2 text-sm" />
            <button className="btn-dark shrink-0 !py-2 text-sm">Confirm</button>
          </form>
        )}
        {sale.can_auto_verify && <p className="text-center text-xs text-muted">Waiting for payment…</p>}
      </div>
    );
  }
  return (
    <>
      <button className="btn-dark w-full" disabled={phase === "loading"} onClick={start}>{phase === "loading" ? "Getting invoice…" : "Buy"}</button>
      {error && <p className="mt-2 text-sm text-bad">{error}</p>}
    </>
  );
}
