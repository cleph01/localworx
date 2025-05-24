import PromotionCard from "../promotions/PromotionCard";

const MyPromotionsSection = () => {
  const myPromotions = [
    {
      id: "1",
      businessId: "1",
      businessName: "Bob's Barbershop",
      promoterId: "1",
      title: "Free Shave With Haircut",
      description: "Come in this weekend and get a free shave.",
      mediaUrl: "https://youtu.be/5CRIEeP4sGk",
      mediaType: "video",
      termsAndConditions: "Valid for new customers only.",
      expiresAt: "2025-09-13",

      rating: "4.7",
      reviewCount: "12",
      clicks: "80",
      views: "150",
      referrals: "30",

      address: "123 Main St, Springfield, USA",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      phone: "(555) 123-4567",
    },

    {
      id: "2",
      businessId: "2",
      promoterId: "1",
      title: "20% Off Your First Campaign!",
      businessName: "BrightPath Marketing",
      description:
        "We help local businesses grow through targeted marketing strategies.",

      rating: "4.5",
      reviewCount: "10",
      clicks: "100",
      views: "200",
      referrals: "50",

      mediaUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      mediaType: "image",
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      phone: "555-123-4567",
      expiresAt: "2025-12-22",
    },
    {
      id: "3",
      businessId: "3",
      promoterId: "1",
      title: "Free Consultation for New Clients!",
      businessName: "Tech Innovations",
      description: "Leading the way in tech solutions for small businesses.",

      rating: "4.0",
      reviewCount: "20",
      clicks: "150",
      views: "300",
      referrals: "70",

      mediaUrl: "https://vimeo.com/153173314?&login=true",
      mediaType: "video",
      address: "456 Oak Ave",
      city: "Riverton",
      state: "CA",
      zip: "90210",
      phone: "555-234-5678",
      expiresAt: "2025-12-22",
    },
    {
      id: "4",
      businessId: "4",
      promoterId: "4",
      title: "Spring Special: Free Garden Assessment",
      businessName: "Green Thumb Landscaping",
      description: "Transforming outdoor spaces into beautiful landscapes.",

      rating: "5.0",
      reviewCount: "30",
      clicks: "200",
      views: "400",
      referrals: "100",

      mediaUrl: "https://youtu.be/ilE0T2H5pF4",
      mediaType: "video",
      address: "789 Elm St",
      city: "Mapleton",
      state: "TX",
      zip: "75001",
      phone: "555-345-6789",
      expiresAt: "2025-12-22",
    },
    {
      id: "5",
      businessId: "5",
      promoterId: "4",
      title: "10% Off All Repairs This Month!",
      businessName: "Bob's Auto Repair",
      description: "Your trusted local auto repair shop.",

      rating: "3.5",
      reviewCount: "5",
      clicks: "50",
      views: "100",
      referrals: "20",

      mediaUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      mediaType: "image",
      address: "321 Pine Rd",
      city: "Lakeside",
      state: "FL",
      zip: "32065",
      phone: "555-456-7890",
      expiresAt: "2025-12-22",
    },
    {
      id: "6",
      businessId: "9",
      promoterId: "4",
      title: "Startup Package: Free Strategy Session",
      businessName: "Charlie & Co. Consulting",
      description:
        "Expert consulting services for small businesses and startups.",

      rating: "4.8",
      reviewCount: "15",
      clicks: "80",
      views: "160",
      referrals: "40",

      mediaUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      mediaType: "image",
      address: "654 Cedar Blvd",
      city: "Brookfield",
      state: "NY",
      zip: "10001",
      phone: "555-567-8901",
      expiresAt: "2025-12-22",
    },
  ]; // Fetch if user is promoting businesses

  return (
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border border-gray-400 px-4 py-6 mb-6">
      <h2 className="text-xl font-bold mb-4">📣 Your Active Promotions</h2>
      {myPromotions.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myPromotions.map((promo) => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You're not promoting any businesses yet.{" "}
          <a href="/promotions" className="text-blue-600 underline">
            Browse promotions
          </a>
          .
        </p>
      )}
    </section>
  );
};

export default MyPromotionsSection;
