import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

// BusinessOverviewSection.tsx
const BusinessOverviewSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  // Simulate fetching from a mock database
  const business = await mockFetch(`/api/businesses/${businessId}`);

  // Check if the business exists
  if (!business) {
    return <div>Business not found</div>;
  }

  // Extract the business data
  const businessData = business.data;

  return (
    <section className="py-8 px-6 max-w-3xl">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={
            businessData.logoUrl ||
            "https://dn721803.ca.archive.org/0/items/placeholder-image//placeholder-image.jpg"
          }
          alt="Business Logo"
          className="rounded w-32 h-32 object-cover"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{businessData.businessName}</h1>
          <p className="text-gray-600">
            {businessData.address}, {businessData.city}, {businessData.state}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Hours:</span> {businessData.hours}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {businessData.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone</span>: {businessData.phone}
          </p>
        </div>
      </div>
    </section>
  );
};
export default BusinessOverviewSection;
