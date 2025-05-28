// app/api/wallet/[id]/balance/walletBalanceService.ts

// MOCK implementation for now
export async function fetchSubwalletBalance(walletId: string): Promise<{
  walletId: string;
  balance: number; // in millisats
}> {
  // Simulate an API call to Alby Jim (replace with real HTTP request later)
  console.log(`Fetching balance for wallet ID: ${walletId}`);

  // real HTTP call to your self-hosted Jim instance
  const res = await fetch(
    `${process.env.JIM_API_BASE}/api/v1/wallet/${walletId}/balance`,
    {
      headers: {
        Authorization: `Bearer ${process.env.JIM_API_KEY}`,
      },
    }
  );
  const json = await res.json();

  return json;

  // TEMP: return mock value
  //   return {
  //     walletId,
  //     balance: 3650000, // 3,650,000 millisats = 3,650 sats
  //   };
}
