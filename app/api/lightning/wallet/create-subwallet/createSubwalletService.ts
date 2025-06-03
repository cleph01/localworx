// app/api/lightning/wallet/create-subwallet/createSubwalletService.ts
import {
  getAlbyHubUrl,
  getHeaders,
  getDailyWalletLimit,
  getDomain,
} from "../utils";

export async function createSubwalletService(username: string) {
  try {
    // Step 1: Check wallet creation limits
    const appsRes = await fetch(new URL("/api/apps", getAlbyHubUrl()), {
      headers: getHeaders(),
    });

    console.log("getAlbyHubUrl:", getAlbyHubUrl());
    console.log("getHeaders:", getHeaders());
    console.log("username:", username);
    console.log("appsRes:", appsRes);

    if (!appsRes.ok) {
      throw new Error(
        "Failed to fetch existing apps: " + (await appsRes.text())
      );
    }

    const apps: { createdAt: string }[] = await appsRes.json();
    const recentApps = apps.filter(
      (app) =>
        new Date(app.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000
    );
    if (recentApps.length >= getDailyWalletLimit()) {
      throw new Error("Daily wallet limit reached");
    }

    // Step 2: Create a new app (subwallet)
    const newAppRes = await fetch(new URL("/api/apps", getAlbyHubUrl()), {
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

    if (!newAppRes.ok) {
      throw new Error("Failed to create wallet: " + (await newAppRes.text()));
    }

    const newApp: { pairingUri: string; pairingPublicKey: string } =
      await newAppRes.json();
    if (!newApp.pairingUri) {
      throw new Error("No pairingUri in app creation response");
    }

    // Step 3: Fetch app ID (if needed)
    const appInfoRes = await fetch(
      new URL(`/api/apps/${newApp.pairingPublicKey}`, getAlbyHubUrl()),
      {
        headers: getHeaders(),
      }
    );

    if (!appInfoRes.ok) {
      throw new Error("Failed to fetch app info: " + (await appInfoRes.text()));
    }

    const appInfo: { id: number } = await appInfoRes.json();
    if (!appInfo.id) {
      throw new Error("Missing app ID in app info response");
    }

    // Step 4: Return metadata for persistence or display
    const domain = getDomain();
    const lightningAddress = `${username}@${domain}`;
    const valueTag = `<podcast:value type="lightning" method="keysend">
  <podcast:valueRecipient name="${lightningAddress}" type="node" address="" customKey="696969"  customValue="${appInfo.id}" split="100"/>
</podcast:value>`;

    return {
      username,
      pairingUri: newApp.pairingUri,
      lightningAddress,
      valueTag,
    };
  } catch (error: any) {
    console.error("createSubwalletService error:", error);
    throw new Error(error.message || "Internal error while creating wallet");
  }
}

// Mimics createWallet() logic from Jim but under your architecture.
