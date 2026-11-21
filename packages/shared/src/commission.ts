// Promoter onboarding commission tiers (from the legacy business model).
// A promoter's Nth onboarded business earns the rate of the tier it falls in.
export const COMMISSION_TIERS = [
  { upTo: 20, rate: 0.1 },
  { upTo: 50, rate: 0.25 },
  { upTo: Infinity, rate: 0.5 },
] as const;

/** Rate for the business that is the `nth` (1-based) one this promoter onboarded. */
export function commissionRateForNth(nth: number): number {
  if (!Number.isInteger(nth) || nth < 1) throw new Error("nth must be a positive integer");
  return COMMISSION_TIERS.find((t) => nth <= t.upTo)!.rate;
}
