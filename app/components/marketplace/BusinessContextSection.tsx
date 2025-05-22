// BusinessContextSection.tsx
const BusinessContextSection = ({ item }: { item: any }) => {
  return (
    <section className="w-full max-w-4xl px-4 py-4 mb-6 border-t border-gray-200">
      <h2 className="text-xl font-bold mb-2">🏪 About the Business</h2>
      <p className="text-gray-600 mb-1">
        {item.businessName} – {item.businessLocation}
      </p>
      <p className="text-sm text-gray-500">
        ⭐ {item.businessRating} from {item.businessRatingCount} reviews
      </p>
    </section>
  );
};
export default BusinessContextSection;
