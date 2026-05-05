// Thin client for the LNbits REST API.
// All functions throw on non-2xx responses so callers can catch uniformly.

function getLnbitsUrl(): string {
  const url = process.env.LNBITS_URL;
  if (!url) throw new Error("LNBITS_URL environment variable is not set");
  return url.replace(/\/$/, "");
}

function getAdminKey(): string {
  const key = process.env.LNBITS_ADMIN_KEY;
  if (!key) throw new Error("LNBITS_ADMIN_KEY environment variable is not set");
  return key;
}

async function lnbitsRequest<T>(
  path: string,
  apiKey: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getLnbitsUrl()}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LNbits ${options.method ?? "GET"} ${path} failed (${res.status}): ${body}`);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Wallet management
// ---------------------------------------------------------------------------

export interface LnbitsWallet {
  id: string;
  name: string;
  adminkey: string;
  inkey: string;
  balance: number; // millisats
}

/** Create a new wallet using the super-admin key. */
export async function lnbitsCreateWallet(name: string): Promise<LnbitsWallet> {
  return lnbitsRequest<LnbitsWallet>("/api/v1/account", getAdminKey(), {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

// ---------------------------------------------------------------------------
// Balance
// ---------------------------------------------------------------------------

export interface LnbitsBalance {
  id: string;
  name: string;
  balance: number; // millisats
}

/** Returns the wallet balance. Uses the invoice key (read-only). */
export async function lnbitsGetBalance(invoiceKey: string): Promise<number> {
  const data = await lnbitsRequest<LnbitsBalance>("/api/v1/wallet", invoiceKey);
  // LNbits returns balance in millisats — convert to sats
  return Math.floor(data.balance / 1000);
}

// ---------------------------------------------------------------------------
// Invoices
// ---------------------------------------------------------------------------

export interface LnbitsInvoice {
  payment_hash: string;
  payment_request: string; // bolt11
}

/** Create a Lightning invoice (receive). Amount is in sats. Uses invoice key. */
export async function lnbitsCreateInvoice(
  invoiceKey: string,
  amount: number,
  memo?: string
): Promise<LnbitsInvoice> {
  return lnbitsRequest<LnbitsInvoice>("/api/v1/payments", invoiceKey, {
    method: "POST",
    body: JSON.stringify({ out: false, amount, memo: memo ?? "" }),
  });
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------

export interface LnbitsPayment {
  payment_hash: string;
}

/** Pay a bolt11 invoice. Uses the admin key. */
export async function lnbitsPayInvoice(
  adminKey: string,
  bolt11: string
): Promise<LnbitsPayment> {
  return lnbitsRequest<LnbitsPayment>("/api/v1/payments", adminKey, {
    method: "POST",
    body: JSON.stringify({ out: true, bolt11 }),
  });
}
