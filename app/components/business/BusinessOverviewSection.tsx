import Button from "../ui/Button";
import { FaBitcoin, FaBtc } from "react-icons/fa";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import HeaderImageWrapper from "../ui/HeaderImageWrapper";
import db from "@/db/db";
import BusinessCategorySection from "./BusinessCategorySection";

// BusinessOverviewSection.tsx
const BusinessOverviewSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const business = await db("businesses").where("id", businessId).first();

  // Check if the business exists
  if (!business) {
    return <div>Business not found</div>;
  }

  return (
    <section className="w-full py-8 px-6 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          <HeaderImageWrapper css="h-64 shadow-lg">
            <img
              src={
                business.logo_url ||
                "https://dn721803.ca.archive.org/0/items/placeholder-image//placeholder-image.jpg"
              }
              alt="Business Logo"
              className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover"
            />
          </HeaderImageWrapper>
        </LazyLoadWrapper>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{business.business_name}</h1>
          <BusinessCategorySection categoryId={business.category_id} />
          {business.description && (
            <div className="text-base sm:text-lg text-gray-600 my-2">
              {business.description}
            </div>
          )}
          <p className="text-sm sm:text-base text-gray-600">
            📍 {business.address}, {business.city}, {business.state}
          </p>

          {business.email && (
            <p className="text-sm sm:text-base text-gray-600">
              <span className="font-semibold">✉️ Email:</span> {business.email}
            </p>
          )}
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-semibold">📱 Phone:</span> {business.phone}
          </p>
          {business.hiring_promoters ? (
            <div className="flex flex-col">
              <div className="flex flex-row items-center mb-4 text-sm sm:text-base text-gray-600">
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
