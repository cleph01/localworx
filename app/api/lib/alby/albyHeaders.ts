export function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    "AlbyHub-Name": process.env.ALBYHUB_NAME || process.env.ALBY_HUB_NAME || "",
    "AlbyHub-Region":
      process.env.ALBYHUB_REGION || process.env.ALBY_HUB_REGION || "",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}
