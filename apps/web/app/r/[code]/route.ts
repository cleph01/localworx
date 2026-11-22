// Promoter referral link: remember who sent this visitor, then show the shop.
// Signed in: the referral is saved on the member's account right away (any device counts).
// Not signed in: a cookie holds it until they sign in or check in, which saves it to the account.
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request, ctx: RouteContext<"/r/[code]">) {
  const { code } = await ctx.params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("promotion_claims")
    .select("promotions!inner(businesses!inner(slug))")
    .eq("referral_code", code)
    .eq("status", "approved")
    .maybeSingle();
  const slug = (data?.promotions as unknown as { businesses: { slug: string } } | undefined)?.businesses.slug;
  const res = NextResponse.redirect(new URL(slug ? `/b/${slug}` : "/directory", req.url));
  if (slug) {
    res.cookies.set("lw_ref", code, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: "lax", secure: true, path: "/" });
    const { data: auth } = await (await createClient()).auth.getUser();
    if (auth.user) await admin.rpc("record_referral", { p_profile: auth.user.id, p_code: code, p_refresh: true });
  }
  return res;
}
