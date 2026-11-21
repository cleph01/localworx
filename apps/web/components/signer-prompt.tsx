"use client";
// Posting and zapping need a signature. A browser extension signs right away; a key
// stored on this device needs its passcode once per tab. This hook asks for it.
import Link from "next/link";
import { useRef, useState } from "react";
import { hasDeviceKey, readySigner, unlockDeviceKey, type Signer } from "@/lib/nostr/signer";

export function useSigner() {
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const waiter = useRef<{ resolve: (s: Signer) => void; reject: (e: Error) => void } | null>(null);

  function getSigner(): Promise<Signer> {
    const ready = readySigner();
    if (ready) return Promise.resolve(ready);
    setError(null);
    setAsking(true);
    return new Promise((resolve, reject) => { waiter.current = { resolve, reject }; });
  }

  function close() {
    setAsking(false);
    waiter.current?.reject(new Error("cancelled"));
    waiter.current = null;
  }

  const prompt = asking ? (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" role="dialog" aria-modal="true" aria-labelledby="unlock-title">
      <div className="card w-full max-w-sm space-y-4 p-6">
        {hasDeviceKey() ? (
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            try {
              const s = unlockDeviceKey(String(new FormData(e.currentTarget).get("pass")));
              setAsking(false);
              waiter.current?.resolve(s);
              waiter.current = null;
            } catch (err) {
              setError((err as Error).message);
            }
          }}>
            <h2 id="unlock-title" className="h-display text-2xl">Unlock your key</h2>
            <p className="text-sm text-muted">Enter the passcode for the key saved in this browser. It stays on this device; LocalWorx only gets the signature.</p>
            <input name="pass" type="password" autoFocus required className="field" placeholder="Passcode" autoComplete="current-password" />
            {error && <p role="alert" className="text-sm text-bad">{error}</p>}
            <div className="flex gap-2">
              <button type="button" className="btn-ghost flex-1" onClick={close}>Cancel</button>
              <button className="btn-dark flex-1">Unlock</button>
            </div>
          </form>
        ) : (
          <>
            <h2 id="unlock-title" className="h-display text-2xl">No key in this browser</h2>
            <p className="text-sm text-muted">You signed in elsewhere. To sign posts here, add your key on the sign-in page, or use a Nostr browser extension.</p>
            <div className="flex gap-2">
              <button type="button" className="btn-ghost flex-1" onClick={close}>Cancel</button>
              <Link href="/signin" className="btn-dark flex-1">Add my key</Link>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;

  return { getSigner, prompt };
}
