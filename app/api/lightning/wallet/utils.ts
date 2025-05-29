// /app/api/wallets/create-subwallet/utils.ts
export function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ALBY_AUTH_TOKEN}`,
    "AlbyHub-Name": process.env.NEXT_PUBLIC_ALBYHUB_APP_NAME || "",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function getAlbyHubUrl() {
  return new URL(
    process.env.NEXT_PUBLIC_ALBYHUB_URL || "https://api.getalby.com"
  );
}
