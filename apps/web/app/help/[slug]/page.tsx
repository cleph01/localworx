import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_ARTICLES, findArticle } from "@/lib/help";
import { Container } from "@/components/ui";

export function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  return { title: findArticle((await params).slug)?.title ?? "Help" };
}

export default async function ArticlePage({ params }: PageProps<"/help/[slug]">) {
  const a = findArticle((await params).slug);
  if (!a) notFound();
  return (
    <Container narrow>
      <Link href="/help" className="text-sm text-muted hover:text-ink">← All help topics</Link>
      <h1 className="h-display mt-4 text-4xl">{a.title}</h1>
      <p className="mt-3 text-lg text-ink-2">{a.summary}</p>
      <div className="mt-8 space-y-4 text-[17px] leading-relaxed">
        {a.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </Container>
  );
}
