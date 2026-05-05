async function generateUniqueWalletUsername(base: string, context: string) {
  const normalized = `${context}_${base.replace(/\s+/g, "_").toLowerCase()}`;
  let attempt = 0;
  let username = normalized;

  while (true) {
    const response = await fetch(
      `/api/alby/wallet/check-username?username=${username}`
    );
    const { available } = await response.json();

    if (available) return username;

    attempt++;
    username = `${normalized}_${Date.now()}`; // or `${normalized}_${attempt}`
    if (attempt >= 3)
      throw new Error("Unable to generate unique wallet username");
  }
}

export default generateUniqueWalletUsername;
