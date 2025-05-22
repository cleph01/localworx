// MarketplaceItemDetailsSection.tsx
const MarketplaceItemDetailsSection = ({ item }: { item: any }) => {
  return (
    <section className="w-full max-w-4xl px-4 py-4">
      <h2 className="text-xl font-bold mb-2">📄 Description</h2>
      <p className="text-gray-700">{item.description}</p>

      <div className="mt-4 text-sm text-gray-600">
        ⚡ Zaps Received: <strong>{item.zapCount}</strong>
      </div>
    </section>
  );
};
export default MarketplaceItemDetailsSection;
