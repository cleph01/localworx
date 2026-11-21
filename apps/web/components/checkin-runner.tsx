"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withTown } from "@localworx/shared";

type Result = { business: string; business_city?: string; visits: number; visits_required: number | null; program_name: string | null; reward_id: string | null };

export function CheckinRunner({ slug, code, referral }: { slug: string; code: string; referral?: string }) {
  const [state, setState] = useState<"locating" | "sending" | "done" | "error">("locating");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const started = useRef(false);
  const validCode = /^\d{8}$/.test(code);

  useEffect(() => {
    if (started.current || !validCode) return;
    started.current = true;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setState("sending");
        const res = await fetch("/api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug, code, lat: pos.coords.latitude, lng: pos.coords.longitude, ref: referral }),
        });
        const data = await res.json();
        if (!res.ok) {
          setState("error");
          setError(data.error ?? "Check-in failed");
        } else {
          setResult(data);
          setState("done");
        }
      },
      () => {
        setState("error");
        setError("We need your location for a moment to confirm you're at the shop. Allow location access and scan again.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [slug, code, referral, validCode]);

  if (!validCode) {
    return (
      <div className="card p-8 text-center">
        <p className="h-display text-2xl">Not checked in</p>
        <p className="mt-3 text-ink-2">This link is missing its check-in code. Scan the QR at the counter.</p>
      </div>
    );
  }
  if (state === "locating" || state === "sending") {
    return (
      <div className="card grid place-items-center p-12 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-paper-2 border-t-orange" />
        <p className="mt-4 font-semibold">{state === "locating" ? "Confirming you're here…" : "Checking you in…"}</p>
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="card p-8 text-center">
        <p className="h-display text-2xl">Not checked in</p>
        <p className="mt-3 text-ink-2">{error}</p>
        <Link href={`/b/${slug}`} className="btn-ghost mt-6">Back to the shop page</Link>
      </div>
    );
  }
  const r = result!;
  return (
    <div className="card p-8 text-center">
      <p className="text-4xl">{r.reward_id ? "🎉" : "✅"}</p>
      <p className="h-display mt-3 text-3xl">{r.reward_id ? "You earned a reward!" : `Checked in at ${withTown(r.business, r.business_city)}`}</p>
      {r.reward_id && <p className="mt-2 text-ink-2">{r.program_name} is waiting in your rewards.</p>}
      {!r.reward_id && r.visits_required && (
        <div className="mx-auto mt-6 max-w-xs">
          <p className="text-sm text-muted">{r.program_name}: {r.visits} of {r.visits_required} visits</p>
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: r.visits_required }, (_, i) => (
              <div key={i} className={`h-2.5 flex-1 rounded-full ${i < r.visits ? "bg-orange" : "bg-paper-2"}`} />
            ))}
          </div>
        </div>
      )}
      <Link href="/me" className="btn-primary mt-8">See my rewards</Link>
    </div>
  );
}
