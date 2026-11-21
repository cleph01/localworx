import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { Container, PageTitle, SignInPrompt } from "@/components/ui";
import { PostComposer } from "@/components/post-composer";
import { publicFeeInfo } from "@/lib/fees";

export const metadata: Metadata = { title: "Write a post" };

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next="/community/new" what="write a post" /></Container>;
  const [{ data: categories }, { data: me }] = await Promise.all([
    supabase.from("categories").select("id, name").order("name"),
    supabase.from("profiles").select("lightning_address").eq("id", auth.user.id).single(),
  ]);
  return (
    <Container narrow>
      <PageTitle eyebrow="Community" title="Write a post">
        Tell your neighbors what&apos;s worth knowing. Readers can tip you in sats.
      </PageTitle>
      {!me?.lightning_address && (
        <p className="mb-6 rounded-xl bg-orange-light/60 p-4 text-sm">
          Add a Lightning address in <a className="font-semibold underline" href="/me/profile">Profile &amp; wallet</a> so readers can tip you. You can post without one.
        </p>
      )}
      <Suspense>
        <PostComposer fees={publicFeeInfo()} categories={categories ?? []} />
      </Suspense>
    </Container>
  );
}
