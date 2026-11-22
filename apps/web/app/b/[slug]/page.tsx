import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui";
import { ReviewForm } from "@/components/review-form";
import { ClaimButton } from "@/components/claim-button";
import { formatWait, withTown } from "@localworx/shared";

async function load(slug: string) {
  const supabase = await createClient();
  const { data: biz } = await supabase
    .from("businesses")
    .select("*, categories(name)")
    .eq("slug", slug)
    .maybeSingle();
  return { supabase, biz };
}

export async function generateMetadata({ params }: PageProps<"/b/[slug]">): Promise<Metadata> {
  const { biz } = await load((await params).slug);
  if (!biz) return { title: "Business" };
  const title = withTown(biz.name, biz.city);
  const category = (biz.categories as { name: string } | null)?.name;
  const where = `${category ? `${category} in` : "In"} ${biz.city}, ${biz.state}`;
  const blurb = biz.description?.trim();
  const description =
    `${where}. ${blurb ? (blurb.length > 140 ? `${blurb.slice(0, 137).trimEnd()}…` : blurb) : "Check in on LocalWorx to earn rewards and get paid for bringing friends."}`;
  return { title, description, openGraph: { title, description }, twitter: { card: "summary_large_image", title, description } };
}

export default async function BusinessPage({ params }: PageProps<"/b/[slug]">) {
  const { slug } = await params;
  const { supabase, biz } = await load(slug);
  if (!biz) notFound();

  const { data: auth } = await supabase.auth.getUser();
  const me = auth.user?.id ?? null;
  const [{ data: program }, { data: promotions }, { data: reviews }, staff, visited] = await Promise.all([
    supabase.from("reward_programs").select("name, description, visits_required").eq("business_id", biz.id).eq("is_active", true).maybeSingle(),
    supabase.from("promotions").select("id, title, body, sats_per_visit, ends_at").eq("business_id", biz.id).eq("is_active", true).order("created_at", { ascending: false }),
    supabase.from("business_reviews").select("rating, body, created_at, profiles(display_name)").eq("business_id", biz.id).order("created_at", { ascending: false }).limit(20),
    me ? supabase.rpc("is_staff", { b: biz.id }) : Promise.resolve({ data: false }),
    me ? supabase.from("checkins").select("id", { count: "exact", head: true }).eq("business_id", biz.id).eq("profile_id", me) : Promise.resolve({ count: 0 }),
  ]);
  const avg = reviews?.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;
  const myVisits = (visited as { count: number | null }).count ?? 0;

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow">{(biz.categories as { name: string }).name}</p>
          <h1 className="h-display mt-2 text-5xl">{biz.name}</h1>
          <p className="mt-2 text-muted">
            {biz.address}, {biz.city}, {biz.state}
            {avg && <> · <span className="text-ink">★ {avg.toFixed(1)}</span> ({reviews!.length})</>}
          </p>
          {biz.description && <p className="mt-6 max-w-2xl whitespace-pre-line text-ink-2">{biz.description}</p>}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {biz.website && <a className="btn-ghost" href={biz.website} target="_blank" rel="noreferrer">Website</a>}
            {biz.phone && <a className="btn-ghost" href={`tel:${biz.phone}`}>Call</a>}
            <a className="btn-ghost" target="_blank" rel="noreferrer"
              href={`https://www.openstreetmap.org/?mlat=${biz.lat}&mlon=${biz.lng}#map=18/${biz.lat}/${biz.lng}`}>Directions</a>
            {staff.data && <Link className="btn-dark" href={`/business/${biz.slug}/manage`}>Manage</Link>}
          </div>

          <section className="mt-12">
            <h2 className="h-display text-2xl">Promotions</h2>
            {promotions?.length ? (
              <ul className="mt-4 space-y-3">
                {promotions.map((p) => (
                  <li key={p.id} className="card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{p.title}</p>
                        {p.body && <p className="mt-1 text-sm text-muted">{p.body}</p>}
                      </div>
                      {p.sats_per_visit > 0 && (
                        <span className="shrink-0 font-mono text-sm font-semibold text-orange-dark">{p.sats_per_visit.toLocaleString()} sats/visit</span>
                      )}
                    </div>
                    <div className="mt-4"><ClaimButton promotionId={p.id} signedIn={!!me} /></div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">No active promotions right now.</p>
            )}
          </section>

          <section className="mt-12">
            <h2 className="h-display text-2xl">Reviews</h2>
            {me && myVisits > 0 && <ReviewForm businessId={biz.id} />}
            {me && myVisits === 0 && <p className="mt-3 text-sm text-muted">Check in here once to leave a review.</p>}
            <ul className="mt-4 space-y-3">
              {reviews?.map((r, i) => (
                <li key={i} className="card p-4">
                  <p className="text-sm"><span className="text-orange-dark">{"★".repeat(r.rating)}</span> <span className="font-semibold">{(r.profiles as unknown as { display_name: string })?.display_name}</span></p>
                  {r.body && <p className="mt-1 text-sm text-ink-2">{r.body}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <p className="eyebrow">Rewards</p>
            {program ? (
              <>
                <p className="h-display mt-2 text-2xl">{program.name}</p>
                <p className="mt-1 text-sm text-muted">After {program.visits_required} visits. {program.description}</p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">This shop hasn&apos;t set up a reward yet. Check-ins still count toward reviews.</p>
            )}
            <div className="mt-5 rounded-xl bg-paper-2 p-4 text-sm">
              <p className="font-semibold">How to check in</p>
              <p className="mt-1 text-muted">Scan the LocalWorx code at the counter with your phone camera. Visits count once every {formatWait(biz.checkin_cooldown_minutes ?? 180)}.</p>
            </div>
          </div>
          {biz.hiring_promoters && (
            <div className="card border-orange/40 bg-orange-light/40 p-6">
              <p className="font-semibold">{biz.name} is hiring promoters</p>
              <p className="mt-1 text-sm text-ink-2">Claim a promotion above and earn sats for every visit you send.</p>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
