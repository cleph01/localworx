import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Container, Empty, PageTitle } from "@/components/ui";
import { BuyButton } from "@/components/buy-button";
import { getUnhonored } from "@/lib/honor";
import { UnpaidIouBadge } from "@/components/honor-badge";

export const metadata: Metadata = { title: "Rewards marketplace" };

export default async function MarketplacePage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const unhonored = await getUnhonored(supabase);
  const { data: listings } = await supabase
    .from("listings")
    .select("id, price_sats, seller_id, created_at, profiles!listings_seller_id_fkey(display_name), rewards(kind, title, details, business_id, businesses(name, slug, city))")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <Container>
      <PageTitle eyebrow="Marketplace" title="Rewards for sale">
        Neighbors sell rewards and IOUs they won&apos;t use: punch-card rewards, and goods promoters earned from shops (a meal, a haircut). You pay the seller directly over Lightning, and it moves to your wallet the moment the payment lands. Every shop has pledged to honor them for whoever holds them.
      </PageTitle>
      {!listings?.length ? (
        <Empty title="Nothing for sale right now" body="Rewards show up here when members list them." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => {
            const r = l.rewards as unknown as { kind: string; title: string; details: string | null; business_id: string; businesses: { name: string; slug: string; city: string } };
            const seller = l.profiles as unknown as { display_name: string };
            return (
              <div key={l.id} className="card flex flex-col p-5">
                <p className="text-sm text-muted">{r.businesses.name} · {r.businesses.city}</p>
                <p className="h-display mt-1 text-xl">{r.title}</p>
                {r.details && <p className="mt-0.5 text-sm text-muted">{r.details}</p>}
                {unhonored.has(r.business_id) && <p className="mt-2"><UnpaidIouBadge info={unhonored.get(r.business_id)} /></p>}
                <p className="mt-1 text-xs text-muted">Sold by {seller.display_name}{r.kind === "promoter_payout" ? " · earned promoting this shop" : ""}</p>
                <p className="mt-4 font-mono text-lg font-semibold text-orange-dark">{l.price_sats.toLocaleString()} sats</p>
                <div className="mt-auto pt-4">
                  {l.seller_id === auth.user?.id ? <p className="text-sm text-muted">Your listing</p> : <BuyButton listingId={l.id} signedIn={!!auth.user} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
