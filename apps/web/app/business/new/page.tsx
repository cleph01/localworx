import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Container, PageTitle, SignInPrompt } from "@/components/ui";
import { NewBusinessForm } from "@/components/new-business-form";

export const metadata: Metadata = { title: "List your business" };

export default async function NewBusinessPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next="/business/new" what="list your business" /></Container>;
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");
  return (
    <Container narrow>
      <PageTitle eyebrow="For businesses" title="List your business">
        Two minutes now, then set a reward and print your counter code.
      </PageTitle>
      <NewBusinessForm categories={categories ?? []} userId={auth.user.id} />
    </Container>
  );
}
