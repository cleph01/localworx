import db from "@/db/db";
import { encrypt } from "@/app/lib/security/aesCrypto";
import { lnbitsCreateWallet } from "@/app/api/lib/lnbits/lnbitsClient";

export async function createWalletForBusinessService({
  businessId,
  userId,
}: {
  businessId: number;
  userId: string;
}) {
  // Look up business name for a human-readable wallet label in LNbits.
  const business = await db("businesses").where({ id: businessId }).first();
  if (!business) {
    throw new Error(`Business ${businessId} not found`);
  }

  const walletName = `${business.business_name} (Business #${businessId})`;
  const lnbitsWallet = await lnbitsCreateWallet(walletName);

  await db("lnbits_wallets").insert({
    user_id: userId,
    business_id: businessId,
    lnbits_wallet_id: lnbitsWallet.id,
    admin_key_encrypted: encrypt(lnbitsWallet.adminkey),
    invoice_key_encrypted: encrypt(lnbitsWallet.inkey),
    wallet_name: walletName,
  });

  return { success: true, businessId };
}
