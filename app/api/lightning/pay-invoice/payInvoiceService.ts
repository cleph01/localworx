import { decrypt } from "@/app/lib/security/aesCrypto";
import { lnbitsPayInvoice, LnbitsPayment } from "@/app/api/lib/lnbits/lnbitsClient";
import { getWalletByBusinessIdDAO } from "@/app/api/lnbits/wallet/walletDAO";

export async function payInvoiceService({
  businessId,
  bolt11,
}: {
  businessId: number | string;
  bolt11: string;
}): Promise<LnbitsPayment> {
  const wallet = await getWalletByBusinessIdDAO(businessId);

  if (!wallet) {
    throw new Error(`No wallet found for business ${businessId}`);
  }

  const adminKey = decrypt(wallet.admin_key_encrypted);
  return lnbitsPayInvoice(adminKey, bolt11);
}
