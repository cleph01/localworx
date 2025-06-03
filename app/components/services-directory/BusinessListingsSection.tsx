import { Zap } from "nostr-tools/kinds";
import Button from "../ui/Button";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import BusinessCard from "../business/BusinessCard";

const BusinessListingsSection = async () => {
  // const businesses = await mockFetch("/api/businesses");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const response = await fetch(`${baseUrl}/api/businesses`, {
    cache: "no-store", // optional: ensure fresh data in Server Components
  });

  const businesses = await response.json();

  if (!businesses) {
    return <div>No businesses found</div>;
  }

  return (
    <section className="flex flex-col gap-4 py-12 px-6 ">
      <h2 className="text-2xl font-bold">Service Listings</h2>
      <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example listing item */}
        {businesses.map((business: any, index: any) => (
          <BusinessCard key={index} business={business} />
        ))}
      </div>

      {/* Load More Results Button */}
      <Button
        details={{
          text: "Load more results",
          css: "w-full my-6 py-4 bg-navy-blue-background text-white text-base font-bold",
        }}
      />
    </section>
  );
};
export default BusinessListingsSection;
// This component is a placeholder for the listings section of the services directory page.
