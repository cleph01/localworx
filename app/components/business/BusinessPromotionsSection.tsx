// BusinessOverviewSection.tsx
import PromotionCard from "../promotions/PromotionCard";

// We would fetch these from Nostr
// these would be the promottions tied to the business

const BusinessPromotionsSection = () => {
  const mockPromotions = [
    {
      id: "1",
      title: "20% Off Your First Visit",
      description: "Join us for a special discount on your first service!",
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      businessName: "LocalWorx Salon",
      location: "123 Main St, Springfield",
      expiresAt: "2023-12-31",
    },
    {
      id: "2",
      title: "Buy One Get One Free",
      description: "Buy one service and get another one free!",
      imageUrl: "/placeholder-promo-2.png",
      businessName: "LocalWorx Spa",
      location: "456 Oak Ave, Springfield",
      expiresAt: "2024-01-15",
    },
    {
      id: "3",
      title: "Free Gift with Purchase",
      description: "Receive a free gift with any purchase over $50.",
      imageUrl: "/placeholder-promo-3.png",
      businessName: "LocalWorx Boutique",
      location: "789 Pine Rd, Springfield",
      expiresAt: "2024-02-28",
    },
  ];

  return (
    <section className="py-6 px-6">
      <h2 className="text-2xl font-bold mb-4">📢 Current Promotions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPromotions.map((promo) => (
          <PromotionCard key={promo.id} promotion={promo} />
        ))}
      </div>
    </section>
  );
};
export default BusinessPromotionsSection;
