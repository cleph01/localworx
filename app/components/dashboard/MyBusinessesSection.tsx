import Link from "next/link";
import BusinessCard from "../business/BusinessCard";
import { FaPlusCircle } from "react-icons/fa";

const MyBusinessesSection = () => {
  const myBusinesses = [
    {
      id: "1",
      businessName: "Bob's Barbershop",
      firstName: "Bob",
      rating: 4.5,
      reviewCount: 10,
      description: "Old-school cuts with a new-school vibe.",
      ownerId: "2",
      address: "123 Main St, Springfield, USA",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      businessHours: "9 AM - 5 PM",
      website: "www.bobsbarbershop.com",
      logoUrl:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=350&auto=format&fit=crop",
      hours: "Mon-Fri: 9 AM - 5 PM, Sat: 10 AM - 4 PM",
      phone: "(555) 123-4567",
      email: "bob@bobsbarbershop.com",
      introOffer: "10% off your first service",
      categories: ["Category1", "Category2"],
      zapCount: 100,
      hiringPromoters: true,
      hasSpecialOffers: true,
    },
  ]; // Replace with real fetch

  return (
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border border-gray-400 px-4 py-6 mb-6">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-4">
          🏪 Your Businesses{" "}
          <span className="text-gray-400">({myBusinesses.length})</span>
        </h2>

        <Link
          href="/dashboard/business/create"
          className="flex flex-row items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaPlusCircle className="h-4 w-4 mr-1" />
          Add Business
        </Link>
      </div>

      {myBusinesses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myBusinesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You haven’t created any businesses yet.{" "}
          <a href="/business/create" className="text-blue-600 underline">
            Start one now.
          </a>
        </p>
      )}
    </section>
  );
};

export default MyBusinessesSection;
