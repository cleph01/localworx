import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container, SignInPrompt } from "@/components/ui";
import { CounterQr } from "@/components/counter-qr";
import { publicEnv } from "@/lib/env";

export const metadata: Metadata = { title: "Counter" };

// Put this page on a tablet or old phone by the register. The code changes every 30 seconds,
// so a photo of it is useless later, and the customer's phone must also be at the shop.
export default async function CounterPage({ params }: PageProps<"/business/[slug]/counter">) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <Container narrow><SignInPrompt next={`/business/${slug}/counter`} what="show your counter code" /></Container>;
  const { data: biz } = await supabase.from("businesses").select("id, name, slug").eq("slug", slug).maybeSingle();
  if (!biz) notFound();
  const { data: secret } = await supabase.from("checkin_secrets").select("secret_hex").eq("business_id", biz.id).maybeSingle();
  if (!secret) notFound(); // RLS: only staff can read it

  return <CounterQr name={biz.name} slug={biz.slug} secretHex={secret.secret_hex} siteUrl={publicEnv.siteUrl()} />;
}
