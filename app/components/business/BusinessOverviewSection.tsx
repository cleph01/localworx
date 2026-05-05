import { FaBtc } from "react-icons/fa";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import HeaderImageWrapper from "../ui/HeaderImageWrapper";
import db from "@/db/db";
import BusinessCategorySection from "./BusinessCategorySection";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";
import ContactActions from "./ContactActions";

const BusinessOverviewSection = async ({
  businessId,
}: {
  businessId: string;
}) => {
  const [business, reviews] = await Promise.all([
    db("businesses").where("id", businessId).first(),
    db("business_reviews").where("business_id", businessId),
  ]);

  if (!business) {
    return <div>Business not found</div>;
  }

  const { rating, reviewCount } = calculateAverageRating(reviews ?? []);

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

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{business.business_name}</h1>

          <div className="flex items-center gap-3 flex-wrap">
            <BusinessCategorySection categoryId={business.category_id} />
            <a
              href="#reviews"
              className="text-xs text-brand-orange hover:underline"
            >
              {reviewCount > 0
                ? `${reviewCount} review${reviewCount !== 1 ? "s" : ""}`
                : "No reviews yet"}
            </a>
          </div>

          <StarRating rating={rating} reviewCount={reviewCount} />

          {business.description && (
            <p className="text-base sm:text-lg text-gray-600">
              {business.description}
            </p>
          )}

          <p className="text-sm text-gray-600">
            📍 {business.address}, {business.city}, {business.state}
          </p>

          {business.phone && (
            <p className="text-sm text-gray-600">
              📱 {business.phone}
            </p>
          )}

          {business.hiring_promoters ? (
            <div className="flex flex-col gap-3 mt-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-orange bg-orange-50 px-3 py-1.5 rounded-full w-fit">
                <FaBtc />
                Hiring Promoters
              </div>
              {business.email ? (
                <ContactActions email={business.email} />
              ) : (
                <p className="text-sm text-gray-400">No contact email listed.</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Not currently hiring promoters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessOverviewSection;
