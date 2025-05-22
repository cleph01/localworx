// MarketplaceItemHeroSection.tsx
import Image from "next/image";

const MarketplaceItemHeroSection = ({ item }: { item: any }) => {
  return (
    <section className="w-full max-w-4xl px-4">
      <img
        src={item.mediaUrl}
        alt={item.title}
        width={1200}
        height={500}
        className="w-full max-h-64 object-cover mt-2"
        // className="w-full h-64 object-cover"
      />
      <div className="py-4">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <p className="text-gray-500">
          {item.category} • {item.businessName}
        </p>
      </div>
    </section>
  );
};
export default MarketplaceItemHeroSection;
