import { decrypt } from "@/app/lib/security/aesCrypto";
import { lnbitsGetBalance } from "@/app/api/lib/lnbits/lnbitsClient";
import { getWalletByBusinessIdDAO } from "@/app/api/lnbits/wallet/walletDAO";

export async function checkBalanceService(businessId: number | string): Promise<number> {
  const wallet = await getWalletByBusinessIdDAO(businessId);

  if (!wallet) {
    throw new Error(`No wallet found for business ${businessId}`);
  }

  const invoiceKey = decrypt(wallet.invoice_key_encrypted);
  return lnbitsGetBalance(invoiceKey);
}
