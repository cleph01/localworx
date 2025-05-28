import { WalletBalance } from "./walletBalanceTypes";

// Replace with your actual admin API key or environment variable
const ADMIN_API_KEY = process.env.LNBITS_API_KEY!;
const LNBITS_API_URL =
  process.env.LNBITS_API_URL || "https://legend.lnbits.com";

export async function getWalletBalance(
  walletId: string
): Promise<WalletBalance> {
  const res = await fetch(`${LNBITS_API_URL}/api/v1/wallet`, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": ADMIN_API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet balance");
  }

  const data = await res.json();

  return {
    balance: data.balance, // in millisats
    name: data.name,
    id: data.id,
    msatoshi: data.msatoshi,
  };
}
