import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container, SignInPrompt } from "@/components/ui";
import { ProgramForm, PromotionForm, ClaimActions, RedeemBox, PromotionToggle, CheckinRulesForm } from "@/components/manage-tools";

export const metadata: Metadata = { title: "Manage" };

const daysAgoIso = (days: number) => new Date(Date.now() - days * 864e5).toISOString();

export default async function ManagePage({ params, searchParams }: PageProps<"/business/[slug]/manage">) {
  const { slug } = await params;
  const isNew = (await searchParams).new === "1";
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next={`/business/${slug}/manage`} what="manage this business" /></Container>;

  const { data: biz } = await supabase.from("businesses").select("id, name, slug, lat, lng, checkin_radius_m, checkin_cooldown_minutes").eq("slug", slug).maybeSingle();
  if (!biz) notFound();
  const { data: staff } = await supabase.rpc("is_staff", { b: biz.id });
  if (!staff) notFound(); // don't reveal that the page exists

  const since = daysAgoIso(30);
  const [{ data: program }, { data: promotions }, { data: claims }, { count: visits30 }, { count: redeemed }] = await Promise.all([
    supabase.from("reward_programs").select("id, name, description, visits_required").eq("business_id", biz.id).eq("is_active", true).maybeSingle(),
    supabase.from("promotions").select("id, title, sats_per_visit, is_active").eq("business_id", biz.id).order("created_at", { ascending: false }),
    supabase.from("promotion_claims").select("id, status, created_at, promotion_id, profiles(display_name)").eq("status", "pending"),
    supabase.from("checkins").select("id", { count: "exact", head: true }).eq("business_id", biz.id).gte("created_at", since),
    supabase.from("rewards").select("id", { count: "exact", head: true }).eq("business_id", biz.id).eq("status", "redeemed"),
  ]);
  const myPromoIds = new Set((promotions ?? []).map((p) => p.id));
  const pending = (claims ?? []).filter((c) => myPromoIds.has(c.promotion_id));

  return (
    <Container>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Manage</p>
          <h1 className="h-display mt-2 text-4xl">{biz.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/b/${biz.slug}`} className="btn-ghost">View public page</Link>
          <Link href={`/business/${biz.slug}/counter`} className="btn-primary">Open counter QR</Link>
        </div>
      </div>

      {isNew && (
        <div className="card mb-8 border-orange/40 bg-orange-light/40 p-5">
          <p className="font-semibold">You&apos;re listed! Two steps to go live:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink-2">
            <li>Set a reward below (for example, a free coffee after 5 visits).</li>
            <li>Open the counter QR on a tablet or old phone by your register.</li>
          </ol>
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Check-ins, last 30 days" value={visits30 ?? 0} />
        <Stat label="Rewards redeemed" value={redeemed ?? 0} />
        <Stat label="Promoters waiting" value={pending.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-6">
          <h2 className="h-display text-2xl">Use a reward</h2>
          <p className="mt-1 text-sm text-muted">Scan the customer&apos;s reward code with the LocalWorx app, or paste it here.</p>
          <RedeemBox />
        </section>

        <section className="card p-6">
          <h2 className="h-display text-2xl">Punch card</h2>
          <ProgramForm businessId={biz.id} current={program} />
        </section>

        <section className="card p-6">
          <h2 className="h-display text-2xl">Check-in rules</h2>
          <CheckinRulesForm businessId={biz.id} current={biz} />
        </section>

        <section className="card p-6">
          <h2 className="h-display text-2xl">Promoters</h2>
          {pending.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No one waiting for approval.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {pending.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper-2 p-3">
                  <span className="text-sm font-medium">{(c.profiles as unknown as { display_name: string }).display_name}</span>
                  <ClaimActions claimId={c.id} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-6">
          <h2 className="h-display text-2xl">Promotions</h2>
          <ul className="mt-4 space-y-2">
            {(promotions ?? []).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                <span className={p.is_active ? "" : "text-muted line-through"}>{p.title} · {p.sats_per_visit} sats/visit</span>
                <PromotionToggle id={p.id} active={p.is_active} />
              </li>
            ))}
          </ul>
          <PromotionForm businessId={biz.id} />
        </section>
      </div>
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="h-display mt-1 text-3xl">{value.toLocaleString()}</p>
    </div>
  );
}
