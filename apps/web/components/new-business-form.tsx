"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { businessInput } from "@localworx/shared";
import { createClient } from "@/lib/supabase/browser";
import { AddressPicker, type PickedPlace } from "@/components/address-picker";

const toSlug = (s: string) => s.toLowerCase().replace(/['’]/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60).replace(/-$/, "");
const validSlug = (s: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s) && s.length >= 3 && s.length <= 60;

// Names don't have to be unique; page addresses do. Try the plain name, then add the town,
// then the street, then a number, so an owner is never blocked by a namesake elsewhere.
function slugCandidates(name: string, place: PickedPlace | null): string[] {
  const base = toSlug(name);
  if (!base) return [];
  const town = toSlug(place?.city ?? "");
  const street = toSlug((place?.address.split(",")[0] ?? "").replace(/^\s*\d+[a-z]?\s+/i, ""));
  const withTown = town ? `${base}-${town}` : base;
  const list = [base, withTown, street && `${withTown}-${street}`, ...Array.from({ length: 8 }, (_, i) => `${withTown}-${i + 2}`)];
  return [...new Set(list.filter(Boolean).map((x) => toSlug(x as string)))].filter(validSlug);
}

export function NewBusinessForm({ categories, userId }: { categories: { id: number; name: string }[]; userId: string }) {
  const [name, setName] = useState("");
  const [customSlug, setCustomSlug] = useState<string | null>(null); // null = pick automatically
  const [place, setPlace] = useState<PickedPlace | null>(null);
  const [check, setCheck] = useState<{ key: string; free: string | null } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const candidates = useMemo(
    () => (customSlug !== null ? [customSlug].filter(validSlug) : slugCandidates(name, place)),
    [customSlug, name, place],
  );
  const key = candidates.join("|");
  useEffect(() => {
    if (!key) return;
    const list = key.split("|");
    const t = setTimeout(async () => {
      const { data } = await createClient().from("businesses").select("slug").in("slug", list);
      const taken = new Set((data ?? []).map((r) => r.slug));
      setCheck({ key, free: list.find((c) => !taken.has(c)) ?? null });
    }, 350);
    return () => clearTimeout(t);
  }, [key]);
  const checking = !!key && check?.key !== key;
  const slug = customSlug ?? (check?.key === key ? check.free : null) ?? candidates[0] ?? "";
  const customTaken = customSlug !== null && !checking && check?.free === null && validSlug(customSlug);
  const suggestion = customTaken && slugCandidates(name, place).length > 0;

  return (
    <form className="card space-y-5 p-6" onSubmit={async (e) => {
      e.preventDefault();
      if (!place) return setError("Find your address and check the pin on the map first.");
      const f = new FormData(e.currentTarget);
      const parsed = businessInput.safeParse({
        name, slug, address: place.address,
        description: String(f.get("description") ?? ""),
        category_id: Number(f.get("category")),
        city: place.city || String(f.get("city") ?? ""), state: place.state || String(f.get("state") ?? ""),
        lat: place.lat, lng: place.lng,
        phone: String(f.get("phone") ?? "") || undefined,
        website: String(f.get("website") ?? "") || undefined,
        lightning_address: String(f.get("ln") ?? "") || undefined,
        hiring_promoters: f.get("hiring") === "on",
      });
      if (!parsed.success) return setError(parsed.error.issues[0].message);
      setBusy(true);
      // A hidden (inactive) listing can still hold an address, so retry automatic ones with a number.
      const tries = customSlug !== null ? [parsed.data.slug] : [parsed.data.slug, ...Array.from({ length: 5 }, (_, i) => `${parsed.data.slug}-${i + 2}`.slice(0, 60))];
      for (const attempt of tries) {
        const { error } = await createClient().from("businesses").insert({ ...parsed.data, slug: attempt, created_by: userId });
        if (!error) return router.push(`/business/${attempt}/manage?new=1`);
        if (!/duplicate/.test(error.message)) break;
        if (customSlug !== null) { setBusy(false); return setError("That page address is taken. Pick another, or clear it to choose one for you."); }
      }
      setBusy(false);
      setError("Couldn't save your business. Try again.");
    }}>
      <label className="block">
        <span className="label">Business name</span>
        <input className="field" required value={name} onChange={(e) => setName(e.target.value)} />
        <span className="mt-1 block text-xs text-muted">Shown exactly as you type it. Another shop elsewhere can have the same name; your town appears next to it.</span>
      </label>
      <label className="block">
        <span className="label">Category</span>
        <select name="category" required className="field" defaultValue="">
          <option value="" disabled>Choose one</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <AddressPicker value={place} onChange={setPlace} />
      {place && (!place.city || !place.state) && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block"><span className="label">Town</span><input name="city" required className="field" defaultValue={place.city} /></label>
          <label className="block"><span className="label">State</span><input name="state" required className="field" defaultValue={place.state} /></label>
        </div>
      )}
      <div>
        <span className="label">Your page address</span>
        <div className="flex items-center rounded-xl border border-line bg-white pl-3.5 text-muted">
          <span className="text-sm">localworx.io/b/</span>
          <input className="w-full rounded-r-xl px-1 py-2.5 text-ink focus:outline-none" value={slug} aria-describedby="slug-status"
            onChange={(e) => {
              const v = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-").replace(/^-/, "").slice(0, 60);
              setCustomSlug(v === "" ? null : v);
            }} />
        </div>
        <p id="slug-status" aria-live="polite" className="mt-1 text-xs">
          {!slug ? <span className="text-muted">Picked for you from your business name.</span>
            : customSlug !== null && !validSlug(customSlug) ? <span className="text-bad">Use at least 3 letters or numbers, no dash at the end.</span>
            : checking ? <span className="text-muted">Checking…</span>
            : customTaken ? (
              <span className="text-bad">Taken.{suggestion && <> <button type="button" className="underline" onClick={() => setCustomSlug(null)}>Pick a free one for me</button></>}</span>
            ) : <span className="text-good">✓ Available{customSlug === null && slug !== toSlug(name) && " (another shop already has the plain name, so we added your town)"}</span>}
          {customSlug !== null && !customTaken && <> · <button type="button" className="text-muted underline" onClick={() => setCustomSlug(null)}>pick for me</button></>}
        </p>
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
