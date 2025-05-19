// ListingsGridSection.tsx
import Image from "next/image";
import ButtonLink from "../ButtonLink";
import MarketplaceItemCard from "./MarketplaceItemCard";

const mockListings = [
  {
    id: "1",
    title: "50% Off Full Service Oil Change",
    image: "https://images.unsplash.com/photo-1588279109059-89b80e217b33",
    price: "₿ 0.0003",
    location: "Greenville, SC",
    category: "Automotive",
    description:
      "Get 50% off a full-service oil change at our Greenville location.",
  },
  {
    id: "2",
    title: "1 Free Personal Training Session",
    image: "https://images.unsplash.com/photo-1611375273385-fd55f274eb53",
    price: "₿ 0.0006",
    location: "Asheville, NC",
    category: "Fitness",
    description:
      "Enjoy a free personal training session with our certified trainers.",
  },
  {
    id: "3",
    title: "$20 Gift Card - Vegan Bakery",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    price: "₿ 0.0005",
    location: "Spartanburg, SC",
    category: "Food & Beverage",
    description:
      "Redeem this $20 gift card at our vegan bakery in Spartanburg.",
  },
];

const ListingsGridSection = () => {
  return (
    <section className="px-4 mt-12">
      <h2 className="text-3xl font-bold text-center mb-6">Current Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockListings.map((listing, idx) => (
          <MarketplaceItemCard key={idx} item={listing} />
        ))}
      </div>
    </section>
  );
};

export default ListingsGridSection;
