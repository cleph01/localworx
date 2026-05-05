import { decrypt } from "@/app/lib/security/aesCrypto";
import { lnbitsCreateInvoice, LnbitsInvoice } from "@/app/api/lib/lnbits/lnbitsClient";
import { getWalletByBusinessIdDAO } from "@/app/api/lnbits/wallet/walletDAO";

export async function createInvoiceService({
  businessId,
  amount,
  memo,
}: {
  businessId: number | string;
  amount: number; // sats
  memo?: string;
}): Promise<LnbitsInvoice> {
  const wallet = await getWalletByBusinessIdDAO(businessId);

  if (!wallet) {
    throw new Error(`No wallet found for business ${businessId}`);
  }

  const invoiceKey = decrypt(wallet.invoice_key_encrypted);
  return lnbitsCreateInvoice(invoiceKey, amount, memo);
}
