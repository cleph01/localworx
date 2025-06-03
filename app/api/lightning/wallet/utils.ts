// /app/api/wallets/create-subwallet/utils.ts
export function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ALBY_AUTH_TOKEN}`,
    "AlbyHub-Name": process.env.NEXT_PUBLIC_ALBYHUB_NAME || "",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function getAlbyHubUrl() {
  return new URL(
    process.env.NEXT_PUBLIC_ALBYHUB_URL || "https://api.getalby.com"
  );
}

export function getBaseUrl() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error("No BASE_URL set");
  }

  return removeTrailingSlash(process.env.NEXT_PUBLIC_BASE_URL);
}

export function getDailyWalletLimit(): number {
  return parseInt(process.env.DAILY_WALLET_LIMIT || "10");
}

export function getDomain() {
  let domain = getBaseUrl().split("//")[1];

  return domain;
}

function removeTrailingSlash(url: string) {
  if (url.endsWith("/")) {
    url = url.substring(0, url.length - 1);
  }
  return url;
}
