// /app/api/wallets/create-subwallet/createSubwalletService.ts
import { getAlbyHubUrl, getHeaders } from "../utils";

export async function createSubwalletService(username: string) {
  const res = await fetch(new URL("/api/apps", getAlbyHubUrl()), {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name: `LocalWorx Wallet - ${username}`,
      pubkey: "",
      budgetRenewal: "monthly",
      maxAmount: 0,
      scopes: [
        "pay_invoice",
        "get_balance",
        "make_invoice",
        "lookup_invoice",
        "list_transactions",
        "notifications",
      ],
      returnTo: "",
      isolated: true,
    }),
  });

  console.log("createSubwalletService response:", res);

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Alby app creation failed: ${err}`);
  }

  const { pairingUri } = await res.json();
  return { username, pairingUri };
}

// Mimics createWallet() logic from Jim but under your architecture.
