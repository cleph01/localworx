import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Container, Empty, PageTitle, SignInPrompt } from "@/components/ui";
import { RewardCard } from "@/components/reward-card";
import { withTown } from "@localworx/shared";

export const metadata: Metadata = { title: "My rewards" };

export default async function MyRewardsPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next="/me" what="see your rewards" /></Container>;

  const [{ data: rewards }, { data: listings }, { data: recent }] = await Promise.all([
    supabase.from("rewards")
      .select("id, status, issued_at, redeemed_at, businesses(name, slug, city), reward_programs(name)")
      .eq("owner_id", auth.user.id).order("issued_at", { ascending: false }),
    supabase.from("listings").select("id, reward_id, price_sats").eq("seller_id", auth.user.id).eq("status", "open"),
    supabase.from("checkins").select("created_at, businesses(name, slug, city)").eq("profile_id", auth.user.id)
      .order("created_at", { ascending: false }).limit(10),
  ]);
  const listingFor = new Map((listings ?? []).map((l) => [l.reward_id, l]));
  const ready = (rewards ?? []).filter((r) => r.status !== "redeemed");
  const used = (rewards ?? []).filter((r) => r.status === "redeemed");

  return (
    <Container>
      <PageTitle eyebrow="Your wallet" title="My rewards">
        Show a reward to staff to use it, or sell it to someone else for sats.
      </PageTitle>
      {ready.length === 0 ? (
        <Empty title="No rewards yet" body="Check in at shops in the directory to start filling punch cards." action={["/directory", "Find shops"]} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ready.map((r) => (
            <RewardCard key={r.id} reward={{
              id: r.id, status: r.status,
              name: (r.reward_programs as unknown as { name: string }).name,
              business: (r.businesses as unknown as { name: string; slug: string; city: string }),
            }} listing={listingFor.get(r.id) ?? null} />
          ))}
        </div>
      )}

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="h-display text-2xl">Recent check-ins</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {(recent ?? []).map((c, i) => (
              <li key={i} className="flex justify-between p-4 text-sm">
                <span className="font-medium">{(() => { const b = c.businesses as unknown as { name: string; city: string }; return withTown(b.name, b.city); })()}</span>
                <span className="text-muted">{new Date(c.created_at).toLocaleDateString()}</span>
              </li>
            ))}
            {!recent?.length && <li className="p-4 text-sm text-muted">None yet.</li>}
          </ul>
        </section>
        <section>
          <h2 className="h-display text-2xl">Used</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
            {used.map((r) => (
              <li key={r.id} className="flex justify-between p-4 text-sm text-muted">
                <span>{(r.reward_programs as unknown as { name: string }).name} · {(() => { const b = r.businesses as unknown as { name: string; city: string }; return withTown(b.name, b.city); })()}</span>
                <span>{r.redeemed_at && new Date(r.redeemed_at).toLocaleDateString()}</span>
              </li>
            ))}
            {!used.length && <li className="p-4 text-sm text-muted">None yet.</li>}
          </ul>
        </section>
      </div>
    </Container>
  );
}
