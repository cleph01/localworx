// Buy a resold reward: hold the listing for this buyer, then fetch an invoice
// straight from the seller's own wallet. LocalWorx never touches the money.
import { createAdminClient } from "@/lib/supabase/admin";
import { getRequestUser, json } from "@/lib/auth";
import { invoiceFromLightningAddress } from "@/lib/lightning/lnurl";

export async function POST(req: Request, ctx: RouteContext<"/api/listings/[id]/buy">) {
  const me = await getRequestUser(req);
  if (!me) return json({ error: "Sign in to buy" }, 401);
  const { id } = await ctx.params;

  const admin = createAdminClient();
  const { data: listing, error } = await admin.rpc("reserve_listing", { p_listing: id, p_buyer: me.userId });
  if (error) return json({ error: error.message }, 409);

  const { data: seller } = await admin
    .from("profiles").select("lightning_address").eq("id", listing.seller_id).single();
  if (!seller?.lightning_address) {
    return json({ error: "The seller hasn't set up a Lightning address yet" }, 409);
  }

  try {
    const inv = await invoiceFromLightningAddress(seller.lightning_address, listing.price_sats, "LocalWorx reward purchase");
    const { data: sale, error: saleErr } = await admin
      .from("sales")
      .insert({
        listing_id: id, buyer_id: me.userId, invoice: inv.invoice,
        payment_hash: inv.paymentHash, verify_url: inv.verifyUrl, amount_sats: listing.price_sats,
      })
      .select("id")
      .single();
    if (saleErr) return json({ error: "Could not start purchase" }, 500);
    return json({ sale_id: sale.id, invoice: inv.invoice, amount_sats: listing.price_sats, can_auto_verify: !!inv.verifyUrl });
  } catch (e) {
    return json({ error: (e as Error).message }, 502);
  }
}
