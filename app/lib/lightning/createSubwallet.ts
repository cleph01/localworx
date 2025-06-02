export async function createSubwallet(
  username: string
): Promise<{ username: string; pairingUri: string }> {
  const res = await fetch("/api/wallets/create-subwallet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (!res.ok) throw new Error("Wallet creation failed");

  return res.json();
}
