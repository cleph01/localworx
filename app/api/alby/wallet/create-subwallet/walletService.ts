import { saveAlbyWalletRecord } from "./walletDAO";
import { encrypt } from "../../../../lib/security/aesCrypto"; // adjust to your structure
import { getAlbyHubUrl } from "../../../lib/alby/albyUtils"; // adjust to your structure
import { getHeaders } from "@/app/api/lib/alby/albyHeaders";

const APP_NAME_PREFIX = process.env.APP_NAME_PREFIX || "LocalWorx ";

export async function createSubwalletService({
  userId,
  businessId,
  context,
}: {
  userId?: string;
  businessId?: string;
  context: "poster" | "business";
}) {
  try {
    const username = context + "_" + (userId || businessId);
    const domain = process.env.LOCALWORX_DOMAIN || "localworx.io";

    const response = await fetch(new URL("/api/apps", getAlbyHubUrl()), {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        name: APP_NAME_PREFIX + "_" + username,
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

    const { pairingUri, id: walletId } = await response.json();

    const encryptedPairingUri = encrypt(pairingUri);

    // Save into LocalWorx local db
    await saveAlbyWalletRecord({
      userId,
      businessId,
      walletId,
      pairingUriEncrypted: encryptedPairingUri,
    });

    const lightningAddress = username + "@" + domain;

    return {
      wallet: {
        connectionSecret: pairingUri + `&lud16=${username}@${domain}`,
        lightningAddress,
      },
      error: undefined,
    };
  } catch (error: any) {
    console.error("Subwallet creation failed", error);
    return { wallet: undefined, error: "internal error" };
  }
}
