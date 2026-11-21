"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildZapRequestTemplate, TIP_PRESETS_SATS } from "@localworx/shared";
import { useSigner } from "@/components/signer-prompt";
import { InvoicePanel } from "@/components/invoice-panel";
import { Spinner } from "@/components/spinner";

type Info = { can_tip: boolean; reason?: string; zap?: boolean; min_sats?: number; max_sats?: number; author_pubkey?: string; event_id?: string };
type Tip = { tip_id: string; invoice: string; amount_sats: number; can_auto_verify: boolean };

export function TipBox({ postId, signedIn, isAuthor }: { postId: string; signedIn: boolean; isAuthor: boolean }) {
  const router = useRouter();
  const { getSigner, prompt } = useSigner();
  const [info, setInfo] = useState<Info | null>(null);
  const [amount, setAmount] = useState<number>(500);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [done, setDone] = useState<number | null>(null);

  useEffect(() => {
    if (!signedIn || isAuthor) return;
    fetch(`/api/posts/${postId}/tip-info`).then((r) => r.json()).then(setInfo).catch(() => setInfo({ can_tip: false, reason: "Couldn't reach the author's wallet." }));
  }, [postId, signedIn, isAuthor]);

  const confirm = useCallback(async (preimage?: string) => {
    if (!tip) return false;
    const res = await fetch(`/api/tips/${tip.tip_id}/confirm`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ preimage }) });
    const data = await res.json().catch(() => ({}));
    if (data.status === "settled") { setDone(tip.amount_sats); setTip(null); router.refresh(); return true; }
    if (!res.ok && res.status !== 202) setError(data.error ?? "Couldn't confirm the tip.");
    return false;
  }, [tip, router]);

  if (isAuthor) return <p className="text-sm text-muted">Tips on this post go straight to the Lightning address in your <Link className="underline" href="/me/profile">profile</Link>.</p>;
  if (!signedIn) return <Link href={`/signin?next=/community/${postId}`} className="btn-primary">⚡ Sign in to tip the author</Link>;
  if (done) return <p className="rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">⚡ Sent {done.toLocaleString()} sats. Thank you for backing local voices!</p>;
  if (!info) return <p className="flex items-center gap-2 text-sm text-muted"><Spinner /> Checking the author&apos;s wallet…</p>;
  if (!info.can_tip) return <p className="text-sm text-muted">{info.reason}</p>;
  if (tip) {
    return (
      <div className="space-y-3">
        <InvoicePanel invoice={tip.invoice} amountSats={tip.amount_sats} canAutoVerify={tip.can_auto_verify} note="straight to the author" confirm={confirm} />
        <button className="text-xs text-muted underline" onClick={() => setTip(null)}>Cancel</button>
        {error && <p className="text-sm text-bad">{error}</p>}
      </div>
    );
  }

  const min = info.min_sats ?? 1, max = info.max_sats ?? 10_000_000;
  return (
    <form className="space-y-3" onSubmit={async (e) => {
      e.preventDefault();
      setError(null);
      if (!Number.isInteger(amount) || amount < min || amount > max) return setError(`Pick between ${min.toLocaleString()} and ${max.toLocaleString()} sats.`);
      setBusy(true);
      try {
        let zap_request: unknown;
        if (info.zap && info.author_pubkey && info.event_id) {
          try {
            const signer = await getSigner();
            zap_request = await signer.signEvent(buildZapRequestTemplate({ authorPubkey: info.author_pubkey, eventId: info.event_id, amountSats: amount, comment }));
          } catch { /* no key handy: send a plain tip instead of a public zap */ }
        }
        const res = await fetch(`/api/posts/${postId}/tip`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount_sats: amount, comment: comment || undefined, zap_request }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return setError(data.error ?? "Couldn't start the tip.");
        setTip(data);
      } finally {
        setBusy(false);
      }
    }}>
      <div className="flex flex-wrap gap-2">
        {TIP_PRESETS_SATS.map((n) => (
          <button type="button" key={n} onClick={() => setAmount(n)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${amount === n ? "border-orange bg-orange-light/60" : "border-line bg-white"}`}>⚡ {n.toLocaleString()}</button>
        ))}
        <input type="number" min={min} max={max} value={amount} onChange={(e) => setAmount(Math.floor(Number(e.target.value)))}
          className="field !w-32 !py-2 text-sm" aria-label="Custom amount in sats" />
      </div>
      <input value={comment} onChange={(e) => setComment(e.target.value)} maxLength={280} className="field !py-2 text-sm" placeholder="Say thanks (optional)" />
      <button className="btn-primary" disabled={busy}>{busy ? <><Spinner /> Getting invoice…</> : `⚡ Tip ${amount.toLocaleString()} sats`}</button>
      <p className="text-xs text-muted">Goes straight from your wallet to the author&apos;s. {info.zap ? "Shows as a public zap on Nostr too." : ""}</p>
      {error && <p role="alert" className="text-sm text-bad">{error}</p>}
      {prompt}
    </form>
  );
}
