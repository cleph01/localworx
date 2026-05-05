import db from "@/db/db";

export function getWalletsByUserIdDAO(userId: number | string) {
  return db("lnbits_wallets").where("user_id", Number(userId));
}

export function getWalletByBusinessIdDAO(businessId: number | string) {
  return db("lnbits_wallets").where("business_id", Number(businessId)).first();
}

export function getWalletByIdDAO(id: number | string) {
  return db("lnbits_wallets").where("id", Number(id)).first();
}
