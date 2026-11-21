"use client";
import { useEffect, useState } from "react";
import {
  createDeviceKey, extensionAvailable, extensionSigner, hasDeviceKey,
  importDeviceKey, signInWith, unlockDeviceKey,
} from "@/lib/nostr/signer";

type Mode = "new" | "unlock" | "extension" | "import";

export function SignInPanel({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>("new");
  const [hasExt, setHasExt] = useState(false);
  const [deviceKey, setDeviceKey] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backup, setBackup] = useState<{ nsec: string; npub: string } | null>(null);

  useEffect(() => {
    const first = setTimeout(() => {
      if (hasDeviceKey()) {
        setDeviceKey(true);
        setMode("unlock");
      }
    }, 0);
    // Extensions inject window.nostr shortly after load.
    const t = setTimeout(() => setHasExt(extensionAvailable()), 300);
    return () => { clearTimeout(first); clearTimeout(t); };
  }, []);

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const done = () => (window.location.href = next);

  if (backup) return <BackupStep {...backup} onDone={done} />;

  const tabs: [Mode, string][] = [
    deviceKey ? ["unlock", "Unlock"] : ["new", "New here"],
    ["extension", "Extension"],
    ["import", "I have a key"],
  ];

  return (
    <div className="card mt-8 p-5 sm:p-6">
      <div className="mb-6 grid grid-cols-3 gap-1 rounded-full bg-paper-2 p-1 text-sm font-medium" role="tablist">
        {tabs.map(([m, label]) => (
          <button key={m} role="tab" aria-selected={mode === m}
            className={`rounded-full px-3 py-1.5 ${mode === m ? "bg-white shadow-sm" : "text-muted hover:text-ink"}`}
            onClick={() => { setMode(m); setError(null); }}>
            {label}
          </button>
        ))}
      </div>

      {mode === "new" && (
        <form onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const name = String(f.get("name"));
          const pass = String(f.get("pass"));
          if (pass.length < 8) return setError("Use a passcode of at least 8 characters.");
          if (pass !== String(f.get("pass2"))) return setError("Passcodes don't match.");
          run(async () => {
            const { signer, nsec, npub } = createDeviceKey(pass);
            await signInWith(signer, name);
            setBackup({ nsec, npub });
          });
        }} className="space-y-4">
          <Field label="Your name" name="name" placeholder="Maria from Main St" required maxLength={50} />
          <Field label="Passcode for this device" name="pass" type="password" required minLength={8}
            hint="Locks your key on this device. We never see it." />
          <Field label="Passcode again" name="pass2" type="password" required />
          <Submit busy={busy}>Create my account</Submit>
        </form>
      )}

      {mode === "unlock" && (
        <form onSubmit={(e) => {
          e.preventDefault();
          const pass = String(new FormData(e.currentTarget).get("pass"));
          run(async () => { await signInWith(unlockDeviceKey(pass)); done(); });
        }} className="space-y-4">
          <p className="text-sm text-muted">Your key is saved on this device. Enter its passcode.</p>
          <Field label="Passcode" name="pass" type="password" required autoFocus />
          <Submit busy={busy}>Unlock and sign in</Submit>
          <button type="button" className="w-full text-center text-sm text-muted underline" onClick={() => setMode("new")}>
            Create a different account
          </button>
        </form>
      )}

      {mode === "extension" && (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Use a Nostr browser extension such as Alby or nos2x. It signs the sign-in request; your key never leaves it.
          </p>
          {hasExt ? (
            <Submit busy={busy} onClick={() => run(async () => { await signInWith(extensionSigner()); done(); })}>
              Sign in with extension
            </Submit>
          ) : (
            <p className="rounded-xl bg-paper-2 p-3 text-sm">
              No extension found in this browser. Install <a className="underline" href="https://getalby.com" target="_blank" rel="noreferrer">Alby</a>, then reload this page.
            </p>
          )}
        </div>
      )}

      {mode === "import" && (
        <form onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const pass = String(f.get("pass"));
          if (pass.length < 8) return setError("Use a passcode of at least 8 characters.");
          run(async () => { await signInWith(importDeviceKey(String(f.get("secret")), pass)); done(); });
        }} className="space-y-4">
          <Field label="Your nsec (or ncryptsec)" name="secret" type="password" required autoComplete="off"
            hint="It's encrypted on this device and never sent anywhere." />
          <Field label="Passcode for this device" name="pass" type="password" required minLength={8} />
          <Submit busy={busy}>Sign in</Submit>
        </form>
      )}

      {error && <p role="alert" className="mt-4 rounded-xl bg-bad/10 p-3 text-sm text-bad">{error}</p>}
    </div>
  );
}

function BackupStep({ nsec, npub, onDone }: { nsec: string; npub: string; onDone: () => void }) {
  const [shown, setShown] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="card mt-8 space-y-4 p-6">
      <p className="eyebrow">One more step</p>
      <h2 className="h-display text-2xl">Back up your key</h2>
      <p className="text-sm text-muted">
        This is your account. If you lose this device and this key, no one can recover it, not even us.
        Save it in a password manager or write it down.
      </p>
      <div className="rounded-xl bg-ink p-4 font-mono text-sm break-all text-paper">
        {shown ? nsec : "nsec1" + "•".repeat(40)}
      </div>
      <div className="flex gap-2">
        <button className="btn-ghost flex-1" onClick={() => setShown((s) => !s)}>{shown ? "Hide" : "Show"}</button>
        <button className="btn-ghost flex-1" onClick={() => navigator.clipboard.writeText(nsec)}>Copy</button>
      </div>
      <p className="text-xs text-muted">Your public ID (safe to share): <span className="font-mono break-all">{npub}</span></p>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} className="mt-1" />
        I saved my key somewhere safe.
      </label>
      <button className="btn-primary w-full" disabled={!saved} onClick={onDone}>Continue</button>
    </div>
  );
}

function Field({ label, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input className="field" {...props} />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Submit({ busy, children, onClick }: { busy: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button type={onClick ? "button" : "submit"} onClick={onClick} disabled={busy} className="btn-primary w-full">
      {busy ? "Working…" : children}
    </button>
  );
}
