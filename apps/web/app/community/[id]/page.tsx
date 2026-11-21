import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as nip19 from "nostr-tools/nip19";
import { COMMUNITY_RELAYS } from "@localworx/shared";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui";
import { TipBox } from "@/components/tip-box";

type Post = {
  id: string; author_id: string; title: string; body: string; media_url: string | null; city: string | null; state: string | null;
  status: string; tips_sats: number; tips_count: number; published_at: string | null; nostr_event_id: string | null;
  categories: { name: string } | null; profiles: { display_name: string; pubkey: string } | null;
};

async function load(id: string) {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("posts")
    .select("id, author_id, title, body, media_url, city, state, status, tips_sats, tips_count, published_at, nostr_event_id, categories(name), profiles!posts_author_id_fkey(display_name, pubkey)")
    .eq("id", id).maybeSingle();
  return { post: data as unknown as Post | null, supabase };
}

export async function generateMetadata({ params }: PageProps<"/community/[id]">): Promise<Metadata> {
  const r = await load((await params).id);
  return r?.post ? { title: r.post.title, description: r.post.body.slice(0, 160) } : { title: "Post" };
}

export default async function PostPage({ params, searchParams }: PageProps<"/community/[id]">) {
  const { id } = await params;
  const isNew = (await searchParams).new === "1";
  const r = await load(id);
  if (!r?.post) notFound();
  const { post, supabase } = r;
  const { data: auth } = await supabase.auth.getUser();
  const isAuthor = auth.user?.id === post.author_id;
  const where = [post.city, post.state].filter(Boolean).join(", ");
  const nevent = post.nostr_event_id && post.profiles
    ? nip19.neventEncode({ id: post.nostr_event_id, author: post.profiles.pubkey, relays: COMMUNITY_RELAYS.slice(0, 2) })
    : null;

  return (
    <Container narrow>
      <Link href="/community" className="text-sm text-muted hover:text-ink">← Community</Link>
      {isNew && post.status === "published" && (
        <p className="mt-4 rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">✓ Published. It&apos;s in the community feed and on the Nostr network.</p>
      )}
      {post.status !== "published" && (
        <p className="mt-4 rounded-xl bg-orange-light/60 p-3 text-sm">Only you can see this: it goes live once the posting fee is paid. <Link className="underline" href="/community/new">Write it again</Link> to start a new payment.</p>
      )}
      <article className="mt-6">
        <p className="eyebrow">{[post.categories?.name, where].filter(Boolean).join(" · ") || "Community"}</p>
        <h1 className="h-display mt-3 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {post.profiles?.display_name || "A neighbor"}{post.published_at && <> · {new Date(post.published_at).toLocaleDateString()}</>}
        </p>
        {post.media_url && (
          // eslint-disable-next-line @next/next/no-img-element -- author-provided https image; not proxied through our server
          <img src={post.media_url} alt="" className="mt-6 w-full rounded-2xl border border-line object-cover" referrerPolicy="no-referrer" loading="lazy" />
        )}
        {post.body && <div className="mt-6 text-lg leading-relaxed whitespace-pre-wrap text-ink-2">{post.body}</div>}
      </article>

      {post.status === "published" && (
        <section className="card mt-10 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="h-display text-2xl">Tip the author</h2>
            <p className="text-sm text-muted"><span className="font-semibold text-orange-dark">⚡ {Number(post.tips_sats).toLocaleString()} sats</span> from {post.tips_count} {post.tips_count === 1 ? "tip" : "tips"}</p>
          </div>
          <div className="mt-4"><TipBox postId={post.id} signedIn={!!auth.user} isAuthor={isAuthor} /></div>
        </section>
      )}
      {nevent && (
        <p className="mt-6 text-sm text-muted">
          Also on Nostr: <a className="underline" href={`https://njump.me/${nevent}`} target="_blank" rel="noopener noreferrer">open in any Nostr app</a>
        </p>
      )}
    </Container>
  );
}
