import type { Metadata } from "next";
import Link from "next/link";
import { HELP } from "@/lib/help";
import { Container, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <Container>
      <PageTitle eyebrow="Help" title="How can we help?">
        Short answers for neighbors, promoters and shop owners.
      </PageTitle>
      <div className="grid gap-10 md:grid-cols-2">
        {HELP.map((section) => (
          <section key={section.title}>
            <h2 className="h-display text-2xl">{section.title}</h2>
            <ul className="mt-4 space-y-2">
              {section.articles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/help/${a.slug}`} className="card block p-4 transition hover:border-ink/30">
                    <p className="font-semibold">{a.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{a.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  );
}
