import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Container, Empty, PageTitle } from "@/components/ui";
import { ClaimButton } from "@/components/claim-button";

export const metadata: Metadata = { title: "Promotions" };

export default async function PromotionsPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const { data: promos } = await supabase
    .from("promotions")
    .select("id, title, body, sats_per_visit, businesses(name, slug, city)")
    .eq("is_active", true)
    .order("sats_per_visit", { ascending: false })
    .limit(100);

  return (
    <Container>
      <PageTitle eyebrow="For promoters" title="Earn sats for spreading the word">
        Pick a shop you&apos;d recommend anyway. Once they approve you, share your link. Every new visit you send pays you directly.
      </PageTitle>
      {!promos?.length ? (
        <Empty title="No open promotions yet" body="Shops post them as they join. Check back soon." action={["/directory", "Browse shops"]} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {promos.map((p) => {
            const b = p.businesses as unknown as { name: string; slug: string; city: string };
            return (
              <div key={p.id} className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/b/${b.slug}`} className="text-sm text-muted hover:text-ink">{b.name} · {b.city}</Link>
                    <p className="h-display mt-1 text-xl">{p.title}</p>
                  </div>
                  {p.sats_per_visit > 0 && <span className="shrink-0 rounded-full bg-orange-light px-3 py-1 font-mono text-sm font-semibold text-orange-dark">{p.sats_per_visit.toLocaleString()} sats</span>}
                </div>
                {p.body && <p className="mt-3 text-sm text-ink-2">{p.body}</p>}
                <div className="mt-5"><ClaimButton promotionId={p.id} signedIn={!!auth.user} /></div>
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}
