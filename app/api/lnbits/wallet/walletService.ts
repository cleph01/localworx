import {
  getWalletsByUserIdDAO,
  getWalletByBusinessIdDAO,
  getWalletByIdDAO,
} from "./walletDAO";

// Returns safe wallet fields only — keys are never sent to the client.
function sanitize(wallet: any) {
  if (!wallet) return null;
  const { admin_key_encrypted, invoice_key_encrypted, ...safe } = wallet;
  return safe;
}

export async function getWalletsByUserIdService(userId: number | string) {
  const wallets = await getWalletsByUserIdDAO(userId);
  return wallets.map(sanitize);
}

export async function getWalletByBusinessIdService(businessId: number | string) {
  return sanitize(await getWalletByBusinessIdDAO(businessId));
}

export async function getWalletByIdService(id: number | string) {
  return sanitize(await getWalletByIdDAO(id));
}
