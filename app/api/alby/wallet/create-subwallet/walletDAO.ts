import db from "@/db/db";

export async function saveAlbyWalletRecord({
  userId,
  businessId,
  walletId,
  pairingUriEncrypted,
}: {
  userId?: string;
  businessId?: string;
  walletId: string;
  pairingUriEncrypted: string;
}) {
  return db("alby_wallets").insert({
    user_id: userId || null,
    business_id: businessId || null,
    alby_wallet_id: walletId,
    pairing_uri_encrypted: pairingUriEncrypted,
    created_at: new Date(),
  });
}
