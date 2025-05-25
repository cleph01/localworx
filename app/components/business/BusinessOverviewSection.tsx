import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import Button from "../ui/Button";
import { FaBitcoin, FaBtc } from "react-icons/fa";

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
    <section className="w-full py-8 px-6 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img
          src={
            businessData.logoUrl ||
            "https://dn721803.ca.archive.org/0/items/placeholder-image//placeholder-image.jpg"
          }
          alt="Business Logo"
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm"
        />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{businessData.businessName}</h1>
          <p className="text-gray-600">
            📍 {businessData.address}, {businessData.city}, {businessData.state}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">💼 Hours:</span>{" "}
            {businessData.businessHours}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">✉️ Email:</span>{" "}
            {businessData.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">📱 Phone:</span>{" "}
            {businessData.phone}
          </p>
          {businessData.hiringPromoters ? (
            <div className="flex flex-col">
              <div className="flex flex-row items-center mb-2">
                <span className="flex flex-row items-center font-semibold mr-1">
                  <FaBtc className="text-orange-500 mr-1" />
                  Income:
                </span>
                <div className="text-gray-600"> HIRING Promoters!</div>
              </div>
              <Button
                details={{
                  css: "bg-green-600 px-4 py-2 text-gray-100 font-bold",
                  text: "Reach out 🤝",
                }}
              />{" "}
            </div>
          ) : (
            <div>❌ Currently not hiring promoters</div>
          )}
        </div>
      </div>
    </section>
  );
};
export default BusinessOverviewSection;
