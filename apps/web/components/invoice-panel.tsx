"use client";
// Show a Lightning invoice and wait for proof it was paid. A browser wallet (WebLN)
// pays in one click and hands back the preimage; otherwise we poll the receiving
// wallet's verify URL, or ask for the preimage by hand.
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyButton } from "@/components/copy-button";
import { Spinner } from "@/components/spinner";

type WebLN = { enable(): Promise<void>; sendPayment(pr: string): Promise<{ preimage: string }> };

export function InvoicePanel({ invoice, amountSats, canAutoVerify, confirm, note }: {
  invoice: string;
  amountSats: number;
  canAutoVerify: boolean;
  /** Returns true once the server accepts the payment. */
  confirm: (preimage?: string) => Promise<boolean>;
  note?: string;
}) {
  const [manualError, setManualError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const stopped = useRef(false);

  useEffect(() => {
    stopped.current = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      const webln = (window as unknown as { webln?: WebLN }).webln;
      if (webln) {
        try {
          await webln.enable();
          const { preimage } = await webln.sendPayment(invoice);
          if (await confirm(preimage)) return;
        } catch { /* closed the wallet prompt: fall back to QR */ }
      }
      if (!canAutoVerify) return;
      const tick = async () => {
        if (stopped.current) return;
        if (await confirm()) return;
        timer = setTimeout(tick, 3000);
      };
      timer = setTimeout(tick, 3000);
    })();
    return () => { stopped.current = true; if (timer) clearTimeout(timer); };
  }, [invoice, canAutoVerify, confirm]);

  return (
    <div className="space-y-3">
      <div className="grid place-items-center rounded-xl bg-white p-3 ring-1 ring-line">
        <QRCodeSVG value={`lightning:${invoice}`} size={200} />
      </div>
      <p className="text-center text-sm"><strong>{amountSats.toLocaleString()} sats</strong>{note && <span className="text-muted"> · {note}</span>}</p>
      <div className="flex gap-2">
        <a href={`lightning:${invoice}`} className="btn-primary flex-1 !py-2 text-sm">Open wallet</a>
        <CopyButton text={invoice} label="Copy invoice" className="btn-ghost flex-1 !py-2 text-sm" />
      </div>
      {canAutoVerify ? (
        <p className="flex items-center justify-center gap-2 text-xs text-muted"><Spinner className="h-3 w-3" /> Waiting for your payment…</p>
      ) : (
        <form className="flex gap-2" onSubmit={async (e) => {
          e.preventDefault();
          setChecking(true);
          setManualError(null);
          const ok = await confirm(String(new FormData(e.currentTarget).get("pre")).trim());
          setChecking(false);
          if (!ok) setManualError("Not confirmed yet. Paste the payment proof (preimage) from your wallet.");
        }}>
          <input name="pre" placeholder="Payment proof (preimage) from your wallet" className="field !py-2 text-sm" />
          <button className="btn-dark shrink-0 !py-2 text-sm" disabled={checking}>{checking ? <Spinner /> : "Confirm"}</button>
        </form>
      )}
      {manualError && <p className="text-xs text-bad">{manualError}</p>}
    </div>
  );
}
