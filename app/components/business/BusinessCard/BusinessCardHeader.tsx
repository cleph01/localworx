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
    {/* Logo + name + rating stacked */}
    <div className="flex flex-row items-start gap-3">
      <LazyLoadWrapper
        fallback={<div className="h-16 w-16 rounded-full bg-gray-200 shrink-0" />}
      >
        <AvatarWrapper css="w-16 h-16 shrink-0">
          <img
            className="w-full h-full object-cover ring-2 ring-white shadow-md"
            src={logo_url}
            alt={business_name}
          />
        </AvatarWrapper>
      </LazyLoadWrapper>

      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-xl font-extrabold text-slate-800 leading-tight truncate">
          {business_name}
        </h3>
        {/* Star rating — prominent, directly under name */}
        <BusinessReviewsSection
          businessId={id}
          clientSideFetch={clientSideFetch ?? false}
          showSnippet={true}
        />
      </div>
    </div>

    {/* Description */}
    {description && (
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    )}
  </div>
);

export default BusinessCardHeader;
