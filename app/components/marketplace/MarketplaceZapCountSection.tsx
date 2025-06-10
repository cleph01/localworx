// MarketplaceItemDetailsSection.tsx

type MarketplaceZapCountSectionProps = {
  businessId: string;
};

const MarketplaceZapsCountSection = ({
  businessId,
}: MarketplaceZapCountSectionProps) => {
  const tempZapCount = 42; // Placeholder for zap count, replace with actual data fetching logic
  return (
    <section className="w-full max-w-4xl px-4 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 bg-orange-50 px-1 py-1 rounded-full">
        <span className="text-lg">⚡️</span>
        <span>{tempZapCount} Zaps Received</span>
      </div>
    </section>
  );
};
export default MarketplaceZapsCountSection;
