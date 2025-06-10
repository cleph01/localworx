/* Marketplace Listing Content */

import BusinessDetailsSection from "./BusinessDetailsSection/BusinessDetailsSection";

import SellerProfileSection from "./SellerProfileSection/SellerProfileSection";
import SellerZapCountSection from "./SellerZapCountSection/SellerZapCountSection";

type MarketplaceItemCardContentProps = {
  businessId: number | string;
  sellerId: number | string;
};
const MarketplaceItemCardContent = ({
  businessId,
  sellerId,
}: MarketplaceItemCardContentProps) => {
  return (
    <div className="flex flex-col justify-center gap-2 mt-2">
      {/* Business Details */}
      <BusinessDetailsSection businessId={businessId} />

      {/* Re-Seller Profile Info */}
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-2 mt-2">
        {/* Avatar & Zaps Received*/}
        <div className="flex flex-row items-center justify-between gap-2 mt-2">
          {/* Seller Profile Section */}
          <SellerProfileSection sellerId={sellerId} />
          {/* Seller Zap Count Section */}

          <SellerZapCountSection />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemCardContent;
