// app/api/zap/send/zapUtils.ts

// Helper: resolve lud16 → lnurlp → metadata

export async function resolveLud16toLNURL(lud16: string): Promise<string> {
  const [name, domain] = lud16.split("@");
  const url = `https://${domain}/.well-known/lnurlp/${name}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to resolve lud16 to LNURL");

  const json = await res.json();
  if (!json?.callback) throw new Error("Invalid LNURLp response");

  return json.callback;
}

export async function fetchZapMetadata(callbackUrl: string): Promise<{
  callback: string;
  maxSendable: number;
  minSendable: number;
}> {
  const res = await fetch(callbackUrl);
  if (!res.ok) throw new Error("Failed to fetch zap metadata");

  const json = await res.json();
  if (!json.callback || !json.minSendable || !json.maxSendable) {
    throw new Error("Invalid zap metadata response");
  }

  return {
    callback: json.callback,
    minSendable: json.minSendable,
    maxSendable: json.maxSendable,
  };
}
