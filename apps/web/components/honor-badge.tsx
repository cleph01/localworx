import type { Unhonored } from "@/lib/honor";

/** Public warning: a holder says this shop refused an IOU and it hasn't been made right. */
export function UnpaidIouBadge({ info, detailed }: { info: Unhonored | undefined; detailed?: boolean }) {
  if (!info) return null;
  const n = info.open_reports;
  return (
    <span title="A customer or promoter reported this shop wouldn't honor a reward or IOU, and it hasn't been made right yet."
      className={`inline-flex items-center gap-1.5 rounded-full bg-bad/10 font-semibold text-bad ${detailed ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs"}`}>
      <span aria-hidden>⚠</span> Unpaid IOU{n > 1 ? ` ×${n}` : ""}
      {detailed && <span className="font-normal">· reported {new Date(info.oldest).toLocaleDateString()}, not yet made right</span>}
    </span>
  );
}

/** Shown on a shop's page when the owner has signed the honor pledge. */
export function PledgedNote() {
  return <span className="inline-flex items-center gap-1 text-xs font-semibold text-good">✓ Pledged to honor every reward and IOU</span>;
}
