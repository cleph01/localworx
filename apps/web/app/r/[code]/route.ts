// Promoter referral link: remember who sent this visitor, then show the shop.
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: Request, ctx: RouteContext<"/r/[code]">) {
  const { code } = await ctx.params;
  const { data } = await createAdminClient()
    .from("promotion_claims")
    .select("promotions!inner(businesses!inner(slug))")
    .eq("referral_code", code)
    .eq("status", "approved")
    .maybeSingle();
  const slug = (data?.promotions as unknown as { businesses: { slug: string } } | undefined)?.businesses.slug;
  const res = NextResponse.redirect(new URL(slug ? `/b/${slug}` : "/directory", req.url));
  if (slug) {
    res.cookies.set("lw_ref", code, { maxAge: 60 * 60 * 24 * 30, httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  }
  return res;
}
