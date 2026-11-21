"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Event } from "nostr-tools/pure";
import { buildPostEventTemplate, FREE_POSTS_PER_DAY, postDraft } from "@localworx/shared";
import type { FeeInfo, PayMethod } from "@/lib/fees";
import { publishToRelays } from "@/lib/nostr/publish";
import { useSigner } from "@/components/signer-prompt";
import { InvoicePanel } from "@/components/invoice-panel";
import { Spinner } from "@/components/spinner";

type Pending = { payment_id: string; invoice: string; amount_sats: number; can_auto_verify: boolean };
type Phase = "edit" | "signing" | "sending" | "paying" | "finishing";

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function PostComposer({ fees, categories }: { fees: FeeInfo; categories: { id: number; name: string }[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const { getSigner, prompt } = useSigner();
  const [phase, setPhase] = useState<Phase>("edit");
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState<PayMethod | null>(fees.methods[0] ?? null);
  const [pending, setPending] = useState<Pending | null>(null);
  const resumed = useRef(false);

  const finish = useCallback(async (postId: string, event?: Event) => {
    setPhase("finishing");
    if (event) await publishToRelays(event).catch(() => 0);
    router.push(`/community/${postId}?new=1`);
  }, [router]);

  const confirm = useCallback(async (paymentId: string, preimage?: string) => {
    const res = await fetch(`/api/post-payments/${paymentId}/confirm`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ preimage }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.status === "published") { await finish(data.post_id, data.event); return true; }
    if (!res.ok && res.status !== 202) setError(data.error ?? "Couldn't confirm the payment.");
    return false;
  }, [finish]);

  // Back from Stripe Checkout.
  useEffect(() => {
    const paid = params.get("paid");
    if (!paid || resumed.current) return;
    resumed.current = true;
    (async () => {
      setPhase("finishing");
      for (let i = 0; i < 6; i++) {
        if (await confirm(paid)) return;
        await new Promise((r) => setTimeout(r, 2000));
      }
      setPhase("edit");
      setError("We couldn't confirm your card payment yet. If you were charged, refresh this page in a minute.");
    })();
  }, [params, confirm]);

  if (phase === "finishing") {
    return <div className="card grid place-items-center gap-3 p-10 text-center"><Spinner className="h-6 w-6" /><p className="font-semibold">Publishing your post…</p><p className="text-sm text-muted">Saving it to LocalWorx and sending it to the Nostr network.</p></div>;
  }

  if (phase === "paying" && pending) {
    return (
      <div className="card space-y-4 p-6">
        <h2 className="h-display text-2xl">Pay the posting fee</h2>
        <p className="text-sm text-muted">Your post is saved. It goes live the moment this is paid. The fee keeps bots and spam out of the feed.</p>
        <InvoicePanel invoice={pending.invoice} amountSats={pending.amount_sats} canAutoVerify={pending.can_auto_verify}
          note="to LocalWorx" confirm={(pre) => confirm(pending.payment_id, pre)} />
        {error && <p role="alert" className="text-sm text-bad">{error}</p>}
      </div>
    );
  }

  const busy = phase !== "edit";
  return (
    <form className="card space-y-5 p-6" onSubmit={async (e) => {
      e.preventDefault();
      setError(null);
      const f = new FormData(e.currentTarget);
      const parsed = postDraft.safeParse({
        title: String(f.get("title") ?? ""),
        body: String(f.get("body") ?? ""),
        media_url: String(f.get("media") ?? "").trim() || undefined,
        category_id: Number(f.get("category")) || undefined,
        city: String(f.get("city") ?? "").trim() || undefined,
        state: String(f.get("state") ?? "").trim() || undefined,
      });
      if (!parsed.success) return setError(parsed.error.issues[0].message);
      try {
        setPhase("signing");
        const signer = await getSigner();
        const event = await signer.signEvent(buildPostEventTemplate(parsed.data));
        setPhase("sending");
        const res = await fetch("/api/posts", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ draft: parsed.data, event, pay: method ?? undefined }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { setPhase("edit"); return setError(data.error ?? "Couldn't post. Try again."); }
        if (data.status === "published") return finish(data.post_id, data.event);
        if (data.checkout_url) { window.location.href = data.checkout_url; return; }
        setPending(data);
        setPhase("paying");
      } catch (err) {
        setPhase("edit");
        if ((err as Error).message !== "cancelled") setError("Couldn't sign your post. Try again.");
      }
    }}>
      <label className="block"><span className="label">Title</span>
        <input name="title" required minLength={3} maxLength={120} className="field" placeholder="The best breakfast on Main Street" /></label>
      <label className="block"><span className="label">Your post</span>
        <textarea name="body" rows={8} maxLength={8000} className="field" placeholder="Tell your neighbors what you found, what you make, or what you know." /></label>
      <label className="block"><span className="label">Image link (optional)</span>
        <input name="media" type="url" className="field" placeholder="https://…" />
        <span className="mt-1 block text-xs text-muted">A link to a photo you&apos;ve already put online (for example on nostr.build).</span></label>
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block sm:col-span-1"><span className="label">Topic</span>
          <select name="category" className="field" defaultValue=""><option value="">Anything</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
        <label className="block"><span className="label">Town</span><input name="city" maxLength={80} className="field" placeholder="Hendersonville" /></label>
        <label className="block"><span className="label">State</span><input name="state" maxLength={40} className="field" placeholder="NC" /></label>
      </div>

      <fieldset className="rounded-xl bg-paper-2 p-4">
        <legend className="sr-only">Posting fee</legend>
        {fees.methods.length === 0 ? (
          <p className="text-sm"><strong>Free during the pilot</strong> · up to {FREE_POSTS_PER_DAY} posts a day. A small posting fee (sats or card) switches on later to keep bots out.</p>
        ) : (
          <>
            <p className="text-sm font-semibold">Posting fee</p>
            <p className="mb-3 text-xs text-muted">It keeps bots and spam out. Tips on your post go straight to your wallet; LocalWorx never takes a cut.</p>
            <div className="flex flex-wrap gap-2">
              {fees.methods.map((m) => (
                <label key={m} className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm ${method === m ? "border-orange bg-orange-light/60" : "border-line bg-white"}`}>
                  <input type="radio" name="pay" className="sr-only" checked={method === m} onChange={() => setMethod(m)} />
                  {m === "sats" ? `⚡ ${fees.postSats.toLocaleString()} sats` : `💳 ${usd(fees.postUsdCents)} by card`}
                </label>
              ))}
            </div>
          </>
        )}
      </fieldset>

      <p className="text-xs text-muted">Your post is signed with your own key and published to the open Nostr network too, so it can be read in any Nostr app.</p>
      {error && <p role="alert" className="rounded-xl bg-bad/10 p-3 text-sm text-bad">{error}</p>}
      <button className="btn-primary w-full" disabled={busy}>
        {phase === "signing" ? <><Spinner /> Signing…</> : phase === "sending" ? <><Spinner /> Sending…</>
          : fees.methods.length === 0 ? "Publish" : method === "usd" ? "Continue to card payment" : "Continue to payment"}
      </button>
      {prompt}
    </form>
  );
}
