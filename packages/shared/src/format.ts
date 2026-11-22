// Two shops can share a name. Wherever a customer could confuse them, show the town too.
export function withTown(name: string, city?: string | null): string {
  return city ? `${name} · ${city}` : name;
}

// What a promotion pays a promoter: sats, an in-kind IOU (a meal, a haircut), or both.
export type PromoterPay = {
  sats_per_visit: number;
  inkind_item?: string | null;
  inkind_visits?: number | null;
};

export function inkindLabel(p: PromoterPay): string | null {
  if (!p.inkind_item) return null;
  const n = p.inkind_visits ?? 1;
  return n <= 1 ? `${p.inkind_item} per visit` : `${p.inkind_item} every ${n} visits`;
}

export function payoutLabel(p: PromoterPay): string {
  const parts: string[] = [];
  if (p.sats_per_visit > 0) parts.push(`${p.sats_per_visit.toLocaleString("en-US")} sats per visit`);
  const kind = inkindLabel(p);
  if (kind) parts.push(kind);
  return parts.join(" + ") || "No payout set";
}

// Days a shop has to make an IOU right before an open report shows publicly.
export const HONOR_GRACE_DAYS = 7;

// The honor pledge a business owner must tick before offering rewards or promotions.
export const HONOR_PLEDGE_POINTS = [
  "Every reward and IOU we issue on LocalWorx is a promise we will keep: punch-card rewards and in-kind promoter payouts alike.",
  "We honor them for whoever holds them, including someone who bought one on the marketplace.",
  "If we stop offering an item, we will give the holder something of equal value.",
  `If a holder reports we refused one and it isn't made right within ${HONOR_GRACE_DAYS} days, our page shows an "Unpaid IOU" badge until it is.`,
] as const;
export const HONOR_PLEDGE_CHECKBOX = "I agree, on behalf of this business, to honor every reward and IOU we issue.";
