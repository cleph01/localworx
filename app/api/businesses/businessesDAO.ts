import db from "@/db/db";

export function getBusinessesByOwnerIdDAO(ownerId: string) {
  return db("businesses")
    .select(
      "businesses.*",
      db.raw(
        "CASE WHEN lnbits_wallets.id IS NOT NULL THEN true ELSE false END AS has_wallet"
      )
    )
    .leftJoin(
      "lnbits_wallets",
      "lnbits_wallets.business_id",
      "businesses.id"
    )
    .where("businesses.owner_id", ownerId);
}

export function getAllBusinessesDAO() {
  return db("businesses").select("*");
}
