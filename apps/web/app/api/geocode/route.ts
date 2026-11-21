// Address → coordinates via OpenStreetMap Nominatim (signed-in users only;
// Nominatim's policy asks for low volume and an identifying User-Agent).
import { getRequestUser, json } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await getRequestUser(req))) return json({ error: "Sign in first" }, 401);
  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q || q.length < 5 || q.length > 200) return json({ error: "Enter a full street address" }, 400);
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("q", q);
  const res = await fetch(url, { headers: { "User-Agent": "LocalWorx/0.1 (+https://localworx.io)" }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) return json({ error: "Address lookup is unavailable right now" }, 502);
  const [hit] = await res.json();
  if (!hit) return json({ error: "We couldn't find that address" }, 404);
  const a = hit.address ?? {};
  return json({
    lat: Number(hit.lat), lng: Number(hit.lon), display: hit.display_name,
    city: a.city ?? a.town ?? a.village ?? a.hamlet ?? "", state: a.state ?? "",
  });
}
