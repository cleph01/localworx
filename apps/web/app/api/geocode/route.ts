// Address → candidate pins. Signed-in users only.
//   ?q=<address>        forward search: US Census first (house-level for US addresses),
//                       then Photon (OpenStreetMap) for anything Census misses.
//   ?lat=..&lng=..      reverse: fill in city/state for a pin the user placed or dragged.
// Both providers are free and keyless. The user picks a result and fine-tunes the pin on a
// map, so we return several candidates instead of silently trusting the first one.
import { getRequestUser, json } from "@/lib/auth";
import type { GeoHit } from "@/lib/geo";

const UA = { "User-Agent": "LocalWorx/0.1 (+https://localworx.io)" };
const TIMEOUT = 7000;

const STATES: Record<string, string> = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA", colorado: "CO", connecticut: "CT",
  delaware: "DE", "district of columbia": "DC", florida: "FL", georgia: "GA", hawaii: "HI", idaho: "ID", illinois: "IL",
  indiana: "IN", iowa: "IA", kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO", montana: "MT",
  nebraska: "NE", nevada: "NV", "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY",
  "north carolina": "NC", "north dakota": "ND", ohio: "OH", oklahoma: "OK", oregon: "OR", pennsylvania: "PA",
  "rhode island": "RI", "south carolina": "SC", "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT",
  vermont: "VT", virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI", wyoming: "WY",
  "puerto rico": "PR",
};
const abbr = (s: string) => STATES[s.toLowerCase()] ?? s;
const title = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

async function census(q: string): Promise<GeoHit[]> {
  const u = new URL("https://geocoding.geo.census.gov/geocoder/locations/onelineaddress");
  u.searchParams.set("address", q);
  u.searchParams.set("benchmark", "Public_AR_Current");
  u.searchParams.set("format", "json");
  const res = await fetch(u, { headers: UA, signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error("census");
  const data = await res.json();
  type M = { matchedAddress: string; coordinates: { x: number; y: number }; addressComponents?: { city?: string; state?: string } };
  return ((data?.result?.addressMatches ?? []) as M[]).slice(0, 3).map((m) => ({
    lat: m.coordinates.y, lng: m.coordinates.x, label: m.matchedAddress.split(", ").map((part, i) => (i < 2 ? title(part) : part)).join(", "),
    city: title(m.addressComponents?.city ?? ""), state: m.addressComponents?.state ?? "", precise: true,
  }));
}

type PhotonProps = { name?: string; housenumber?: string; street?: string; city?: string; town?: string; village?: string; district?: string; county?: string; state?: string; postcode?: string; type?: string };
const photonHit = (p: PhotonProps, [lng, lat]: [number, number]): GeoHit => {
  const city = p.city ?? p.town ?? p.village ?? p.district ?? "";
  const street = [p.housenumber, p.street].filter(Boolean).join(" ");
  const label = [p.name && p.name !== p.street ? p.name : null, street || null, city || p.county, [abbr(p.state ?? ""), p.postcode].filter(Boolean).join(" ")]
    .filter(Boolean).join(", ");
  return { lat, lng, label, city, state: abbr(p.state ?? ""), precise: !!p.housenumber || p.type === "house" };
};

async function photon(q: string): Promise<GeoHit[]> {
  const u = new URL("https://photon.komoot.io/api/");
  u.searchParams.set("q", q);
  u.searchParams.set("limit", "5");
  u.searchParams.set("lang", "en");
  const res = await fetch(u, { headers: UA, signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error("photon");
  const data = await res.json();
  return (data?.features ?? []).map((f: { properties: PhotonProps; geometry: { coordinates: [number, number] } }) =>
    photonHit(f.properties, f.geometry.coordinates));
}

async function reverse(lat: number, lng: number): Promise<GeoHit | null> {
  const u = new URL("https://photon.komoot.io/reverse");
  u.searchParams.set("lat", String(lat));
  u.searchParams.set("lon", String(lng));
  u.searchParams.set("lang", "en");
  const res = await fetch(u, { headers: UA, signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error("reverse");
  const f = (await res.json())?.features?.[0];
  return f ? { ...photonHit(f.properties, f.geometry.coordinates), lat, lng } : null;
}

const near = (a: GeoHit, b: GeoHit) => Math.abs(a.lat - b.lat) < 0.0005 && Math.abs(a.lng - b.lng) < 0.0005;

export async function GET(req: Request) {
  if (!(await getRequestUser(req))) return json({ error: "Sign in first" }, 401);
  const sp = new URL(req.url).searchParams;

  if (sp.has("lat") && sp.has("lng")) {
    const lat = Number(sp.get("lat")), lng = Number(sp.get("lng"));
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return json({ error: "Bad location" }, 400);
    try {
      return json({ hit: await reverse(lat, lng) });
    } catch {
      return json({ hit: null });
    }
  }

  const q = sp.get("q")?.trim();
  if (!q || q.length < 5 || q.length > 200) return json({ error: "Enter a street address with the town, like 12 Main St, Hendersonville NC." }, 400);

  const [c, p] = await Promise.allSettled([census(q), photon(q)]);
  if (c.status === "rejected" && p.status === "rejected") return json({ error: "Address search is down right now. Try again in a minute, or place the pin on the map yourself." }, 502);
  const hits: GeoHit[] = [];
  for (const h of [...(c.status === "fulfilled" ? c.value : []), ...(p.status === "fulfilled" ? p.value : [])]) {
    if (h.label && !hits.some((x) => near(x, h))) hits.push(h);
  }
  return json({ hits: hits.slice(0, 5) });
}
