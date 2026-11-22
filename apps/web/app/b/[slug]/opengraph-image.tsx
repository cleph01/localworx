// Link preview for a shop page: shop name, town, category, and what a visit earns.
import { ImageResponse } from "next/og";
import { createClient } from "@supabase/supabase-js";
import { DISPLAY, OG, OG_SIZE, SANS, logoSrc, nameSize, ogFonts } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "A local shop on LocalWorx";
export const size = OG_SIZE;
export const contentType = "image/png";

type Shop = {
  id: string;
  name: string;
  city: string;
  state: string;
  categories: { name: string } | null;
};

async function loadShop(slug: string) {
  // Anonymous read, the same thing a logged-out visitor sees (RLS applies).
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
  const { data: shop } = await sb
    .from("businesses")
    .select("id, name, city, state, categories(name)")
    .eq("slug", slug)
    .maybeSingle<Shop>();
  if (!shop) return null;
  const [{ data: program }, { data: promos }] = await Promise.all([
    sb.from("reward_programs").select("name, visits_required").eq("business_id", shop.id).eq("is_active", true).maybeSingle(),
    sb.from("promotions").select("sats_per_visit, inkind_item").eq("business_id", shop.id).eq("is_active", true).order("sats_per_visit", { ascending: false }).limit(20),
  ]);
  const item = promos?.find((p) => p.inkind_item)?.inkind_item ?? null;
  return { shop, program, topSats: promos?.[0]?.sats_per_visit ?? 0, item };
}

function Pill({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 22px",
        borderRadius: 100,
        fontSize: 26,
        fontWeight: 600,
        background: accent ? "rgba(247,147,26,0.16)" : "rgba(251,247,239,0.08)",
        border: `1px solid ${accent ? "rgba(247,147,26,0.5)" : "rgba(251,247,239,0.16)"}`,
        color: accent ? OG.orange : OG.paper,
      }}
    >
      {children}
    </div>
  );
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const [data, fonts] = await Promise.all([loadShop((await params).slug).catch(() => null), ogFonts()]);
  const shop = data?.shop;

  const pills: { text: string; accent?: boolean }[] = [];
  if (data?.program) {
    const v = data.program.visits_required;
    pills.push({ text: `Punch card: reward after ${v} visit${v === 1 ? "" : "s"}` });
  }
  if (data && data.topSats > 0) pills.push({ text: `Bring a friend, earn ${data.topSats.toLocaleString("en-US")} sats`, accent: true });
  else if (data?.item) pills.push({ text: `Bring a friend, earn: ${data.item}`, accent: true });
  if (shop && pills.length === 0) pills.push({ text: "Check in, earn rewards you own" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px 56px",
          background: OG.ink,
          fontFamily: SANS,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,147,26,0.22), transparent 68%)",
          }}
        />

        {/* Top: category + town */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: OG.slate, fontWeight: 600 }}>
          {shop ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: OG.orange, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 24, fontWeight: 700 }}>
                {shop.categories?.name ?? "Local shop"}
              </span>
              <span style={{ color: "rgba(251,247,239,0.3)", margin: "0 18px" }}>•</span>
              <span>{`${shop.city}, ${shop.state}`}</span>
            </div>
          ) : (
            <span>Local shops on LocalWorx</span>
          )}
        </div>

        {/* Middle: shop name + what you get */}
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div
            style={{
              display: "flex",
              fontSize: nameSize(shop?.name ?? "LocalWorx"),
              fontFamily: DISPLAY,
              fontWeight: 600,
              color: OG.paper,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              maxWidth: 1040,
            }}
          >
            {shop?.name ?? "LocalWorx"}
          </div>
          {pills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {pills.map((p) => <Pill key={p.text} accent={p.accent}>{p.text}</Pill>)}
            </div>
          )}
        </div>

        {/* Bottom: brand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: OG.paper, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={logoSrc()} width={48} height={46} alt="" style={{ objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: 34, fontWeight: 700, color: OG.paper, letterSpacing: "-0.02em" }}>LocalWorx</span>
          </div>
          <span style={{ fontSize: 22, color: OG.faint }}>Build a stronger town, one paid shoutout at a time.</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
