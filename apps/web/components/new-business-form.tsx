"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessInput } from "@localworx/shared";
import { createClient } from "@/lib/supabase/browser";

type Geo = { lat: number; lng: number; display: string; city: string; state: string };

const toSlug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

export function NewBusinessForm({ categories, userId }: { categories: { id: number; name: string }[]; userId: string }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [address, setAddress] = useState("");
  const [geo, setGeo] = useState<Geo | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function lookup() {
    setError(null);
    const res = await fetch(`/api/geocode?q=${encodeURIComponent(address)}`);
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setGeo(data);
  }

  return (
    <form className="card space-y-5 p-6" onSubmit={async (e) => {
      e.preventDefault();
      if (!geo) return setError("Look up your address first so customers can find you.");
      const f = new FormData(e.currentTarget);
      const parsed = businessInput.safeParse({
        name, slug, address,
        description: String(f.get("description") ?? ""),
        category_id: Number(f.get("category")),
        city: geo.city || String(f.get("city") ?? ""), state: geo.state || String(f.get("state") ?? ""),
        lat: geo.lat, lng: geo.lng,
        phone: String(f.get("phone") ?? "") || undefined,
        website: String(f.get("website") ?? "") || undefined,
        lightning_address: String(f.get("ln") ?? "") || undefined,
        hiring_promoters: f.get("hiring") === "on",
      });
      if (!parsed.success) return setError(parsed.error.issues[0].message);
      setBusy(true);
      const { error } = await createClient().from("businesses").insert({ ...parsed.data, created_by: userId });
      setBusy(false);
      if (error) return setError(/duplicate/.test(error.message) ? "That web address is taken. Try another." : "Couldn't save your business.");
      router.push(`/business/${parsed.data.slug}/manage?new=1`);
    }}>
      <label className="block">
        <span className="label">Business name</span>
        <input className="field" required value={name} onChange={(e) => { setName(e.target.value); if (!slugTouched) setSlug(toSlug(e.target.value)); }} />
      </label>
      <label className="block">
        <span className="label">Your page address</span>
        <div className="flex items-center rounded-xl border border-line bg-white pl-3.5 text-muted">
          <span className="text-sm">localworx.io/b/</span>
          <input className="w-full rounded-r-xl px-1 py-2.5 text-ink focus:outline-none" required value={slug}
            onChange={(e) => { setSlugTouched(true); setSlug(toSlug(e.target.value)); }} />
        </div>
      </label>
      <label className="block">
        <span className="label">Category</span>
        <select name="category" required className="field" defaultValue="">
          <option value="" disabled>Choose one</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <div>
        <span className="label">Street address</span>
        <div className="flex gap-2">
          <input className="field" required value={address} placeholder="123 Main St, Port Chester, NY"
            onChange={(e) => { setAddress(e.target.value); setGeo(null); }} />
          <button type="button" className="btn-ghost shrink-0" onClick={lookup}>Look up</button>
        </div>
        {geo && <p className="mt-1.5 text-xs text-good">✓ Found: {geo.display}</p>}
        <p className="mt-1 text-xs text-muted">Check-ins only count within about 60 m of this spot, so make sure it&apos;s your front door.</p>
      </div>
      <label className="block">
        <span className="label">About your business</span>
        <textarea name="description" rows={4} maxLength={2000} className="field" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block"><span className="label">Phone</span><input name="phone" className="field" /></label>
        <label className="block"><span className="label">Website</span><input name="website" type="url" placeholder="https://" className="field" /></label>
      </div>
      <label className="block">
        <span className="label">Lightning address (optional)</span>
        <input name="ln" className="field" placeholder="shop@getalby.com" />
        <span className="mt-1 block text-xs text-muted">Where customers and fans can tip you in sats. LocalWorx never holds funds.</span>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="hiring" /> We&apos;d like local promoters to help bring in customers
      </label>
      {error && <p role="alert" className="rounded-xl bg-bad/10 p-3 text-sm text-bad">{error}</p>}
      <button className="btn-primary w-full" disabled={busy}>{busy ? "Saving…" : "Create my listing"}</button>
    </form>
  );
}
