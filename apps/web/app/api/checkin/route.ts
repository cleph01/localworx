// Member scans the counter QR. We verify the rotating code and the distance,
// then the database records the visit and fills the punch card.
import { checkinRequest, isValidCode, haversineMeters, DEFAULT_CHECKIN_RADIUS_M, formatWait } from "@localworx/shared";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";

export async function POST(req: Request) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in to check in" }, 401);

  const parsed = checkinRequest.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Malformed check-in" }, 400);
  const { slug, code, lat, lng, ref } = parsed.data;

  const admin = createAdminClient();
  const { data: biz } = await admin
    .from("businesses")
    .select("id, name, city, lat, lng, checkin_radius_m, checkin_secrets(secret_hex)")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  const secret = (biz?.checkin_secrets as unknown as { secret_hex: string } | null)?.secret_hex;
  if (!biz || !secret) return json({ error: "Business not found" }, 404);

  if (!isValidCode(secret, code)) {
    return json({ error: "That code has expired. Scan the QR at the counter again." }, 400);
  }
  const meters = haversineMeters({ lat, lng }, { lat: biz.lat, lng: biz.lng });
  if (meters > (biz.checkin_radius_m ?? DEFAULT_CHECKIN_RADIUS_M)) {
    return json({ error: `You need to be at ${biz.name} to check in (you're about ${Math.round(meters)} m away).` }, 400);
  }

  // Only credit a referral that belongs to an approved promoter of THIS business.
  let referral: string | null = null;
  if (ref) {
    const { data: claim } = await admin
      .from("promotion_claims")
      .select("referral_code, promotions!inner(business_id)")
      .eq("referral_code", ref)
      .eq("status", "approved")
      .eq("promotions.business_id", biz.id)
      .maybeSingle();
    referral = claim?.referral_code ?? null;
  }

  const { data, error } = await admin.rpc("record_checkin", {
    p_profile: me.userId, p_business: biz.id, p_lat: lat, p_lng: lng, p_ref: referral,
  });
  if (error) return json({ error: "Could not record check-in" }, 500);
  if (!data.ok) {
    if (data.reason === "too_soon") {
      return json({ error: `You already checked in here recently. Your next visit counts in about ${formatWait(data.wait_minutes)}.` }, 409);
    }
    return json({ error: "Business not found" }, 404);
  }
  return json({ business: biz.name, business_city: biz.city, ...data });
}
