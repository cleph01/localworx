// Reusable skeleton loading primitives.
// All variants use Tailwind's animate-pulse. Import only what you need.

/** Single line — use for short text labels (category, balance, etc.) */
export function SkeletonLine({
  width = "w-24",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div className={`${height} ${width} bg-gray-200 rounded animate-pulse`} />
  );
}

/** Pill shape — use where a category badge will appear */
export function SkeletonPill() {
  return <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />;
}

/** Star rating row — use wherever ⭐ N.N (X) will appear */
export function SkeletonRating() {
  return <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />;
}

/** Avatar + two text lines — use for profile/seller/author/promoter sections */
export function SkeletonProfile() {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <div className="h-16 w-16 bg-gray-200 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-4 w-28 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

/** Business name + address lines — use for business detail sections */
export function SkeletonBusinessDetails() {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>
  );
}

/** Card grid — use for full dashboard sections (businesses, promotions, posts) */
export function SkeletonCardGrid() {
  return (
    <section className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 mb-6 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg" />
        ))}
      </div>
    </section>
  );
}

/** Reward/offer block — use for intro offer and loyalty sections */
export function SkeletonReward() {
  return (
    <div className="space-y-2 animate-pulse p-4 bg-gray-100 rounded-lg">
      <div className="h-5 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 rounded" />
    </div>
  );
}

/** CTA row — use for add-to-cart / price + button rows */
export function SkeletonCTA() {
  return (
    <div className="flex justify-between items-center px-4 py-6 animate-pulse">
      <div className="h-8 w-24 bg-gray-200 rounded" />
      <div className="h-10 w-32 bg-gray-200 rounded" />
    </div>
  );
}

/** Snapshot card — use for rewards vault / earnings summary cards */
export function SkeletonSnapshotCard() {
  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse">
      <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
