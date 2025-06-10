// app/components/business/BusinessCard/BusinessCardHeader.tsx

import AvatarWrapper from "../../ui/AvatarWrapper";
import LazyLoadWrapper from "../../ui/LazyLoadWrapper";
import BusinessReviewsSection from "./BusinessReviewsSection";

type BusinessCardHeaderType = {
  id: string;
  business_name: string;
  description?: string;
  logo_url?: string;
  clientSideFetch?: boolean;
};
const BusinessCardHeader = ({
  id,
  business_name,
  description,
  logo_url,
  clientSideFetch,
}: BusinessCardHeaderType) => (
  <div className="flex flex-col gap-2">
    <div className="flex flex-row items-center justify-between gap-2">
      {/* Title */}
      <h3 className="flex-1 text-xl sm:text-2xl font-extrabold text-slate-800">
        {business_name}
      </h3>
      {/* business review */}
      <BusinessReviewsSection
        businessId={id}
        clientSideFetch={clientSideFetch ?? false}
      />
    </div>

    {/* Logo Avatar, name, rating in a row */}
    <div className="flex flex-row items-center gap-2 mt-2">
      <LazyLoadWrapper
        fallback={
          <div className="h-24 w-24 rounded-full bg-gray-200 rounded-full" />
        }
      >
        {/* Business Logo Avatar */}
        <AvatarWrapper css="w-24 h-24">
          <img
            className="w-full h-full object-cover ring-2 ring-white shadow-md"
            src={logo_url}
            alt={business_name}
          />
        </AvatarWrapper>
      </LazyLoadWrapper>

      {/* Business Owner FirstName  */}
      <div className="text-sm sm:text-base ml-2 line-clamp-3">
        {description}
      </div>
    </div>
  </div>
);

export default BusinessCardHeader;
