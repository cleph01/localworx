import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BusinessMap } from "@/components/map/business-map";
import { Container, Empty, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Directory" };

export default async function DirectoryPage({ searchParams }: PageProps<"/directory">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const cat = typeof sp.category === "string" ? sp.category : "";

  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name, slug").order("name");
  let query = supabase
    .from("businesses")
    .select("slug, name, description, city, state, lat, lng, hiring_promoters, categories!inner(name, slug), reward_programs(name, visits_required, is_active)")
    .order("name")
    .limit(200);
  if (q) query = query.or(`name.ilike.%${q.replace(/[%,()]/g, "")}%,city.ilike.%${q.replace(/[%,()]/g, "")}%`);
  if (cat) query = query.eq("categories.slug", cat);
  const { data: businesses } = await query;
  const list = businesses ?? [];

  return (
    <Container>
      <PageTitle eyebrow="Directory" title="Local shops on LocalWorx">
        Check in at any of these to start filling a punch card.
      </PageTitle>

      <form className="mb-8 flex flex-col gap-3 sm:flex-row" action="/directory">
        <input name="q" defaultValue={q} placeholder="Search by name or town" className="field sm:max-w-sm" />
        <select name="category" defaultValue={cat} className="field sm:max-w-56">
          <option value="">All categories</option>
          {categories?.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <button className="btn-dark">Search</button>
      </form>

      {list.length === 0 ? (
        <Empty title="No shops here yet" body="Know a business that should be on LocalWorx? Send them our way." action={["/business/new", "List a business"]} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul className="space-y-3">
            {list.map((b) => {
              const program = (b.reward_programs as { name: string; visits_required: number; is_active: boolean }[]).find((p) => p.is_active);
              const category = b.categories as unknown as { name: string };
              return (
                <li key={b.slug}>
                  <Link href={`/b/${b.slug}`} className="card block p-5 transition hover:border-ink/30 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-sm text-muted">{category.name} · {b.city}, {b.state}</p>
                      </div>
                      {b.hiring_promoters && (
                        <span className="shrink-0 rounded-full bg-orange-light px-2.5 py-1 text-xs font-semibold text-orange-dark">Hiring promoters</span>
                      )}
                    </div>
                    {program && (
                      <p className="mt-3 text-sm text-ink-2">🎁 {program.name} after {program.visits_required} visits</p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="h-[420px] lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <BusinessMap pins={list.map((b) => ({ slug: b.slug, name: b.name, lat: b.lat, lng: b.lng }))} />
          </div>
        </div>
      )}
    </Container>
  );
}
