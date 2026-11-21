import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Container, Empty, PageTitle, SignInPrompt } from "@/components/ui";

export const metadata: Metadata = { title: "My businesses" };

export default async function MyBusinessesPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next="/me/businesses" what="manage your businesses" /></Container>;
  const { data } = await supabase.from("business_staff").select("role, businesses(name, slug, city)").eq("profile_id", auth.user.id);
  return (
    <Container narrow>
      <PageTitle eyebrow="Owner tools" title="My businesses" />
      {!data?.length ? (
        <Empty title="No businesses yet" body="List your shop in a couple of minutes and start rewarding regulars." action={["/business/new", "List a business"]} />
      ) : (
        <>
          <ul className="space-y-3">
            {data.map((s) => {
              const b = s.businesses as unknown as { name: string; slug: string; city: string };
              return (
                <li key={b.slug} className="card flex items-center justify-between gap-4 p-5">
                  <div><p className="font-semibold">{b.name}</p><p className="text-sm text-muted">{b.city} · {s.role}</p></div>
                  <div className="flex gap-2">
                    <Link href={`/business/${b.slug}/counter`} className="btn-ghost !py-2 text-sm">Counter QR</Link>
                    <Link href={`/business/${b.slug}/manage`} className="btn-dark !py-2 text-sm">Manage</Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/business/new" className="btn-ghost mt-6">Add another business</Link>
        </>
      )}
    </Container>
  );
}
