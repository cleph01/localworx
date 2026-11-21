"use client";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CODE_STEP_SECONDS, checkinUrl, currentCode } from "@localworx/shared";

export function CounterQr({ name, slug, secretHex, siteUrl }: { name: string; slug: string; secretHex: string; siteUrl: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const first = setTimeout(() => setNow(Date.now()), 0);
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => { clearTimeout(first); clearInterval(t); };
  }, []);
  if (now === null) return null;

  const url = checkinUrl(siteUrl, slug, currentCode(secretHex, now));
  const left = CODE_STEP_SECONDS - (Math.floor(now / 1000) % CODE_STEP_SECONDS);

  return (
    <div className="grid min-h-[80vh] place-items-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <p className="eyebrow">Check in at</p>
        <h1 className="h-display mt-2 text-4xl">{name}</h1>
        <div className="card mx-auto mt-8 inline-block p-6">
          <QRCodeSVG value={url} size={280} level="M" />
        </div>
        <div className="mx-auto mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-paper-2">
          <div className="h-full bg-orange transition-all duration-1000 ease-linear" style={{ width: `${(left / CODE_STEP_SECONDS) * 100}%` }} />
        </div>
        <p className="mt-6 text-lg text-ink-2">Point your phone camera here to earn rewards.</p>
        <p className="mt-1 text-sm text-muted">New code every {CODE_STEP_SECONDS} seconds · LocalWorx</p>
        <button className="btn-ghost mt-8 text-sm" onClick={() => document.documentElement.requestFullscreen?.()}>Full screen</button>
      </div>
    </div>
  );
}
