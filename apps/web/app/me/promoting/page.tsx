import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { publicEnv } from "@/lib/env";
import { Container, Empty, PageTitle, SignInPrompt } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";
import { withTown } from "@localworx/shared";

export const metadata: Metadata = { title: "Promoting" };

export default async function PromotingPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next="/me/promoting" what="see your promotions" /></Container>;
  const { data: claims } = await supabase
    .from("promotion_claims")
    .select("id, status, referral_code, created_at, promotions(title, sats_per_visit, businesses(name, slug, city))")
    .eq("promoter_id", auth.user.id)
    .order("created_at", { ascending: false });

  return (
    <Container narrow>
      <PageTitle eyebrow="Promoter" title="Promoting">
        Share your link. When someone you sent checks in, the shop pays you in sats.
      </PageTitle>
      {!claims?.length ? (
        <Empty title="You're not promoting anything yet" body="Pick a promotion from a shop you love." action={["/promotions", "Browse promotions"]} />
      ) : (
        <ul className="space-y-3">
          {claims.map((c) => {
            const p = c.promotions as unknown as { title: string; sats_per_visit: number; businesses: { name: string; city: string } };
            const link = `${publicEnv.siteUrl()}/r/${c.referral_code}`;
            return (
              <li key={c.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="font-semibold">{p.title}</p><p className="text-sm text-muted">{withTown(p.businesses.name, p.businesses.city)} · {p.sats_per_visit.toLocaleString()} sats per visit</p></div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === "approved" ? "bg-good/10 text-good" : c.status === "rejected" ? "bg-bad/10 text-bad" : "bg-paper-2 text-muted"}`}>{c.status}</span>
                </div>
                {c.status === "approved" && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-paper-2 p-2 pl-3">
                    <code className="flex-1 truncate text-sm">{link}</code>
                    <CopyButton text={link} />
                  </div>
                )}
                {c.status === "approved" && <p className="mt-2 text-xs text-muted">When you post about this, say it&apos;s a paid promotion (the law requires it, and your followers will trust you more).</p>}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
