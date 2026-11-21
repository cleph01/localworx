import "server-only";
// Posting fees: the small cost that keeps bots and throwaway accounts out of the
// community feed. Fees go to LocalWorx's OWN Lightning address or Stripe account;
// they are LocalWorx revenue, never user funds held on someone's behalf.
//
// A method is offered only when it is configured. With neither configured (pilot),
// posting is free but capped per member per day (FREE_POSTS_PER_DAY).

const int = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Math.round(Number(v)) : d);

export const fees = {
  postSats: int(process.env.POST_FEE_SATS, 1000),
  postUsdCents: int(process.env.POST_FEE_USD_CENTS, 100),
  lightningAddress: process.env.LOCALWORX_LIGHTNING_ADDRESS?.trim() || null,
  stripeKey: process.env.STRIPE_SECRET_KEY?.trim() || null,
};

export type PayMethod = "sats" | "usd";

export function postFeeMethods(): PayMethod[] {
  const m: PayMethod[] = [];
  if (fees.lightningAddress && fees.postSats > 0) m.push("sats");
  if (fees.stripeKey && fees.postUsdCents >= 50) m.push("usd"); // Stripe's minimum charge is $0.50
  return m;
}

/** What the About page and the composer show. Safe to send to the browser. */
export function publicFeeInfo() {
  return { methods: postFeeMethods(), postSats: fees.postSats, postUsdCents: fees.postUsdCents };
}
export type FeeInfo = ReturnType<typeof publicFeeInfo>;
