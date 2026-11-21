import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Container, SignInPrompt } from "@/components/ui";
import { CheckinRunner } from "@/components/checkin-runner";

export const metadata: Metadata = { title: "Check in" };

// The counter QR opens this page: /c/<business-slug>?code=<rotating code>
export default async function CheckinPage({ params, searchParams }: PageProps<"/c/[slug]">) {
  const { slug } = await params;
  const { code } = await searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const ref = (await cookies()).get("lw_ref")?.value;

  return (
    <Container narrow>
      {data.user ? (
        <CheckinRunner slug={slug} code={typeof code === "string" ? code : ""} referral={ref} />
      ) : (
        <SignInPrompt next={`/b/${slug}`} what="check in" />
      )}
    </Container>
  );
}
