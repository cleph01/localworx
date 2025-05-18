import ServiceListingCard from "./ServiceListingCard";

const ListingsSection = () => {
  const listings = [
    {
      id: 1,
      businessName: "business1",
      firstName: "John",
      rating: 4.5,
      reviewCount: 10,
      avatarUrl:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      businessHours: "9 AM - 5 PM",
      address: "123 Main St",
      hiringPromoters: true,
      hasSpecialOffers: false,
      introOffer: "10% off your first service",
      categories: ["Category1", "Category2"],
    },
    {
      id: 2,
      businessName: "business2",
      firstName: "Jane",
      rating: 4.0,
      reviewCount: 20,
      avatarUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      businessHours: "10 AM - 6 PM",
      address: "456 Elm St",
      hiringPromoters: false,
      hasSpecialOffers: true,
      introOffer: "Free consultation",
      categories: ["Category3", "Category4"],
    },
    {
      id: 3,
      businessName: "business3",
      firstName: "Alice",
      rating: 5.0,
      reviewCount: 30,
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
      businessHours: "8 AM - 4 PM",
      address: "789 Oak St",
      hiringPromoters: true,
      hasSpecialOffers: false,
      introOffer: "20% off for referrals",
      categories: ["Category5", "Category6"],
    },
    {
      id: 4,
      businessName: "business4",
      firstName: "Bob",
      rating: 3.5,
      reviewCount: 5,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      businessHours: "11 AM - 7 PM",
      address: "101 Pine St",
      hiringPromoters: false,
      hasSpecialOffers: true,
      introOffer: "Buy one get one free",
      categories: ["Category7", "Category8"],
    },
    {
      id: 5,
      businessName: "business5",
      firstName: "Charlie",
      rating: 4.8,
      reviewCount: 15,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
      businessHours: "7 AM - 3 PM",
      address: "202 Maple St",
      hiringPromoters: true,
      hasSpecialOffers: false,
      introOffer: "Free shipping on orders over $50",
      categories: ["Category9", "Category10"],
    },
    {
      id: 6,
      businessName: "business6",
      firstName: "Dave",
      rating: 4.2,
      reviewCount: 25,
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
      businessHours: "12 PM - 8 PM",
      address: "303 Birch St",
      hiringPromoters: false,
      hasSpecialOffers: true,
      introOffer: "10% off for new customers",
      categories: ["Category11", "Category12"],
    },
  ];
  // This is a placeholder for the listings data. In a real application, this data would be fetched from an API or database.
  return (
    <section className="flex flex-col gap-4 py-12">
      <h2 className="text-2xl font-bold">Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {listings.map((listing) => (
          <ServiceListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {/* TODO: Modularize this button into UI component */}
      <div className="my-6 py-4 shadow-lg inline-flex items-center justify-center rounded-lg bg-navy-blue-background text-white text-sm font-bold">
        Load more results
      </div>
    </section>
  );
};
export default ListingsSection;
// This component is a placeholder for the listings section of the services directory page.
