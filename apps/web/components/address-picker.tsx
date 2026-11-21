"use client";
// Street address → a pin the owner confirms on a map. Check-ins only count within the shop's radius (default 60 m)
// of this pin, so the owner always sees and can drag it, rather than trusting a geocoder.
import dynamic from "next/dynamic";
import { useRef, useState, useSyncExternalStore } from "react";
import type { GeoHit } from "@/lib/geo";
import { Spinner } from "@/components/spinner";

const PinPickerMap = dynamic(() => import("./map/pin-picker-map"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-paper-2" />,
});

export type PickedPlace = { address: string; lat: number; lng: number; city: string; state: string };

type Status =
  | { kind: "idle" }
  | { kind: "searching" }
  | { kind: "results"; hits: GeoHit[] }
  | { kind: "none" }
  | { kind: "error"; message: string };

const noop = () => () => {};


export function AddressPicker({ value, onChange }: { value: PickedPlace | null; onChange: (p: PickedPlace | null) => void }) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [locating, setLocating] = useState(false);
  const reqId = useRef(0);

  async function search() {
    const q = address.trim();
    if (q.length < 5) return setStatus({ kind: "error", message: "Type the full street address, including the town and state." });
    const id = ++reqId.current;
    setStatus({ kind: "searching" });
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json().catch(() => ({}));
      if (id !== reqId.current) return;
      if (!res.ok) return setStatus({ kind: "error", message: data.error ?? "Address search failed. Try again." });
      const hits: GeoHit[] = data.hits ?? [];
      if (!hits.length) return setStatus({ kind: "none" });
      setStatus({ kind: "results", hits });
      choose(hits[0], q);
    } catch {
      if (id === reqId.current) setStatus({ kind: "error", message: "Couldn't reach the address search. Check your connection and try again." });
    }
  }

  function choose(h: GeoHit, typed = address.trim()) {
    onChange({ address: typed || h.label, lat: h.lat, lng: h.lng, city: h.city, state: h.state });
  }

  async function movePin(lat: number, lng: number) {
    if (!value) return;
    onChange({ ...value, lat, lng });
    // Fill a missing city/state from where the pin landed.
    if (value.city && value.state) return;
    const res = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`).catch(() => null);
    const hit: GeoHit | null = res?.ok ? (await res.json()).hit : null;
    if (hit) onChange({ ...value, lat, lng, city: value.city || hit.city, state: value.state || hit.state });
  }

  // Only works on https or localhost; hidden otherwise.
  const canLocate = useSyncExternalStore(noop, () => window.isSecureContext && "geolocation" in navigator, () => false);
  function locateMe() {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const res = await fetch(`/api/geocode?lat=${coords.latitude}&lng=${coords.longitude}`).catch(() => null);
        const hit: GeoHit | null = res?.ok ? (await res.json()).hit : null;
        setLocating(false);
        setStatus({ kind: "idle" });
        if (hit && !address.trim()) setAddress(hit.label);
        onChange({ address: address.trim() || hit?.label || "", lat: coords.latitude, lng: coords.longitude, city: hit?.city ?? "", state: hit?.state ?? "" });
      },
      () => { setLocating(false); setStatus({ kind: "error", message: "Location is blocked. Allow it in your browser, or search the address instead." }); },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }

  const searching = status.kind === "searching";

  return (
    <div>
      <span className="label">Street address</span>
      <div className="flex gap-2">
        <input className="field" value={address} placeholder="12 Main St, Hendersonville, NC" autoComplete="street-address"
          onChange={(e) => { setAddress(e.target.value); if (value) onChange({ ...value, address: e.target.value }); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); search(); } }} />
        <button type="button" className="btn-ghost shrink-0" onClick={search} disabled={searching}>
          {searching ? <><Spinner /> <span className="ml-1">Finding…</span></> : "Find"}
        </button>
      </div>
      {canLocate && (
        <button type="button" className="mt-2 text-sm text-orange underline-offset-2 hover:underline disabled:opacity-60" onClick={locateMe} disabled={locating}>
          {locating ? <><Spinner /> Getting your location…</> : "I'm at the shop now: use my location"}
        </button>
      )}

      <div aria-live="polite" className="mt-2 text-sm">
        {status.kind === "none" && (
          <p className="rounded-xl bg-bad/10 p-3 text-bad">
            No match for that address. Check the spelling and include the town and state. Still nothing? Search just your
            street and town, then drag the pin to your door.
          </p>
        )}
        {status.kind === "error" && <p className="rounded-xl bg-bad/10 p-3 text-bad">{status.message}</p>}
        {status.kind === "results" && status.hits.length > 1 && (
          <fieldset className="space-y-1">
            <legend className="mb-1 text-xs text-muted">{status.hits.length} matches. Pick the right one:</legend>
            {status.hits.map((h) => {
              const on = !!value && value.lat === h.lat && value.lng === h.lng;
              return (
                <button type="button" key={`${h.lat},${h.lng}`} onClick={() => choose(h)}
                  className={`block w-full rounded-lg border px-3 py-2 text-left ${on ? "border-orange bg-orange/10" : "border-line bg-white hover:bg-paper-2"}`}>
                  {h.label}{!h.precise && <span className="ml-2 text-xs text-muted">(approximate)</span>}
                </button>
              );
            })}
          </fieldset>
        )}
      </div>

      {value && (
        <div className="mt-3 space-y-2">
          <PinPickerMap lat={value.lat} lng={value.lng} onMove={movePin} />
          <p className="text-xs text-muted">
            <strong className="text-ink">Drag the pin to where your counter QR will stand</strong> (or tap the map). Customers can check in within
            60 m of it; you can widen that later in Manage.{value.city && <> · {value.city}{value.state && `, ${value.state}`}</>}
          </p>
        </div>
      )}
      {!value && status.kind === "idle" && (
        <p className="mt-1 text-xs text-muted">We&apos;ll show it on a map so you can put the pin right on your door.</p>
      )}
    </div>
  );
}
