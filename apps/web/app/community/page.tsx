import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Empty } from "@/components/ui";

export const metadata: Metadata = {
  title: "Community",
  description: "Get paid for your local voice: write about your town, earn tips in sats, promote the shops you love.",
};

type Row = {
  id: string; title: string; body: string; media_url: string | null; city: string | null; state: string | null;
  tips_sats: number; tips_count: number; published_at: string;
  categories: { name: string } | null; profiles: { display_name: string; picture_url: string | null } | null;
};

const WAYS = [
  ["Write about your town", "Post about the places, people and things worth knowing. Readers tip you in sats, straight to your wallet.", "/community/new", "Write a post"],
  ["Promote shops you love", "Shops pay you sats for every new customer you send in. You set nothing up; they pay you directly.", "/promotions", "Browse promotions"],
  ["Sell rewards you won't use", "Earned a free lunch you'll never eat? List it on the marketplace and get paid in sats.", "/marketplace", "Open the marketplace"],
] as const;

export default async function CommunityPage({ searchParams }: PageProps<"/community">) {
  const sp = await searchParams;
  const town = typeof sp.town === "string" ? sp.town.trim().slice(0, 80) : "";
  const supabase = await createClient();
  let q = supabase.from("posts")
    .select("id, title, body, media_url, city, state, tips_sats, tips_count, published_at, categories(name), profiles!posts_author_id_fkey(display_name, picture_url)")
    .eq("status", "published").eq("hidden", false)
    .order("published_at", { ascending: false }).limit(30);
  if (town) q = q.ilike("city", town.replace(/[%_]/g, ""));
  const { data } = await q;
  const posts = (data ?? []) as unknown as Row[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-orange/15 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 md:pt-20">
          <p className="eyebrow">Community</p>
          <h1 className="h-display mt-4 max-w-3xl text-[2.4rem] leading-[1.08] sm:text-6xl">
            Your local voice is <em className="font-display text-orange-dark not-italic">worth something here.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-2">
            You already tell friends where to eat, who fixes bikes right, and what&apos;s happening this weekend.
            On LocalWorx, that word of mouth earns you Bitcoin, from neighbors who value it and shops that
            want you to keep talking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/community/new" className="btn-primary">Write a post</Link>
            <Link href="/about#costs" className="btn-ghost">How fees work</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {WAYS.map(([t, b, href, cta], i) => (
            <div key={t} className="card flex flex-col p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-paper">{i + 1}</span>
              <h2 className="h-display mt-4 text-2xl">{t}</h2>
              <p className="mt-2 text-[15px] text-ink-2">{b}</p>
              <Link href={href} className="mt-auto pt-5 text-sm font-semibold text-orange-dark hover:underline">{cta} →</Link>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          Keep posting on YouTube, Instagram or X too. Your LocalWorx posts are Nostr notes, so readers on any Nostr app can find and zap them.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Latest from neighbors</p>
            <h2 className="h-display mt-2 text-3xl">{town ? `Posts from ${town}` : "Community posts"}</h2>
          </div>
          <form className="flex gap-2" action="/community">
            <input name="town" defaultValue={town} placeholder="Filter by town" className="field !py-2 text-sm" aria-label="Filter by town" />
            <button className="btn-ghost !py-2 text-sm">Filter</button>
            {town && <Link href="/community" className="btn-ghost !py-2 text-sm">Clear</Link>}
          </form>
        </div>
        {posts.length === 0 ? (
          <div className="mt-8">
            <Empty title={town ? `No posts from ${town} yet` : "No posts yet"} body="Be the first to put your town on the map." action={["/community/new", "Write the first post"]} />
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <li key={p.id}>
                <Link href={`/community/${p.id}`} className="card flex h-full flex-col p-5 transition hover:border-ink/30 hover:shadow-sm">
                  <p className="text-xs text-muted">
                    {[p.categories?.name, p.city && [p.city, p.state].filter(Boolean).join(", ")].filter(Boolean).join(" · ") || "Community"}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug">{p.title}</h3>
                  {p.body && <p className="mt-2 line-clamp-3 text-[15px] text-ink-2">{p.body}</p>}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
                    <span className="text-muted">{p.profiles?.display_name || "A neighbor"} · {new Date(p.published_at).toLocaleDateString()}</span>
                    <span className="font-semibold text-orange-dark">⚡ {Number(p.tips_sats).toLocaleString()}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
