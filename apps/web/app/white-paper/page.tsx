import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const TITLE = "LocalWorx: A Sovereign Stack for Main Street";
const SUBTITLE = "Paying neighbors in goods and Bitcoin for the customers they bring, without custody, accounts, or ads.";
const SOURCE = "https://github.com/cleph01/localworx/blob/main/apps/web/content/white-paper.md";

export const metadata: Metadata = {
  title: "White paper",
  description: SUBTITLE,
};

export const dynamic = "force-static"; // read once at build time

function load() {
  const md = readFileSync(path.join(process.cwd(), "content/white-paper.md"), "utf8");
  return md.replace(/^<!--[\s\S]*?-->\s*/, "");
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

const components: Components = {
  h2: ({ children }) => (
    <h2 id={slug(textOf(children))} className="h-display mt-14 scroll-mt-24 text-3xl">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
  p: ({ children }) => <p className="mt-4 leading-relaxed text-ink-2">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-2 marker:text-orange">{children}</ul>,
  ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-2 marker:text-orange-dark">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href} className="font-medium text-orange-dark underline underline-offset-2">{children}</Link>
    ) : (
      <a href={href} className="font-medium text-orange-dark underline underline-offset-2" target="_blank" rel="noreferrer">{children}</a>
    ),
  blockquote: ({ children }) => <blockquote className="mt-6 border-l-4 border-orange/60 pl-4 italic">{children}</blockquote>,
  hr: () => <hr className="mt-14 border-line" />,
  table: ({ children }) => (
    <div className="card mt-6 overflow-x-auto">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-paper-2/70">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-t border-line px-4 py-3 align-top text-ink-2">{children}</td>,
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) =>
    className === "language-mermaid" ? (
      <LoopDiagram />
    ) : (
      <code className="rounded bg-paper-2 px-1.5 py-0.5 text-[0.9em]">{children}</code>
    ),
};

export default function WhitePaperPage() {
  const md = load();
  const toc = [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6 md:pt-24">
      <header className="max-w-3xl">
        <p className="eyebrow">White paper · Draft v0.1 · Nov 2026</p>
        <h1 className="h-display mt-4 text-[2.2rem] leading-[1.1] sm:text-5xl">{TITLE}</h1>
        <p className="mt-5 text-lg text-ink-2">{SUBTITLE}</p>
        <p className="mt-5 text-sm text-muted">
          By Charlie Montoya · <a href={SOURCE} className="underline underline-offset-2" target="_blank" rel="noreferrer">Markdown source</a>
        </p>
      </header>
      <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Contents" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-semibold">Contents</p>
            <ol className="mt-3 space-y-2 text-sm">
              {toc.map((t) => (
                <li key={t}><a href={`#${slug(t)}`} className="text-muted hover:text-ink">{t}</a></li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="max-w-3xl [&>h2:first-child]:mt-0">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{md}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

/* The loop from section 3, drawn in HTML instead of Mermaid. */
const LOOP = [
  { who: "Shop", text: "Posts a promotion: a free haircut every 3 visits, or 2,000 sats per visit." },
  { who: "Neighbor", text: "Claims it and shares their link." },
  { who: "Friend", text: "Walks in and checks in at the counter." },
  { who: "Shop pays", text: "The promoter gets an IOU for the shop's goods, or sats wallet to wallet. The customer's punch card fills toward a reward, which is also an IOU." },
  { who: "Holder", text: "Uses the IOU, or sells it on the marketplace for sats." },
  { who: "Shop", text: "Honors the IOU for whoever holds it, and gets promoted again." },
];

function LoopDiagram() {
  return (
    <figure className="card mt-6 p-5 not-italic" aria-label="The LocalWorx loop">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LOOP.map((s, i) => (
          <li key={i} className="rounded-xl border border-line bg-paper-2/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-dark">{i + 1}. {s.who}</p>
            <p className="mt-1.5 text-sm text-ink-2">{s.text}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 flex items-center gap-2 text-sm font-medium">
        <span aria-hidden className="text-lg text-orange-dark">↺</span>
        Step 6 leads back to step 2: a shop that keeps its word gets promoted again.
      </figcaption>
    </figure>
  );
}
