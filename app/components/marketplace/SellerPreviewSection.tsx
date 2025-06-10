import db from "@/db/db";
import AvatarWrapper from "../ui/AvatarWrapper";
import MarketplaceZapsCountSection from "./MarketplaceZapCountSection";

// SellerPreviewSection.tsx

type SellerPreviewSectionProps = {
  sellerId: string;
};
const SellerPreviewSection = async ({
  sellerId,
}: SellerPreviewSectionProps) => {
  const user = await db("users").where("id", sellerId).first();
  if (!user) {
    return <div className="text-red-500">Seller not found</div>;
  }
  return (
    <section className="w-full max-w-4xl px-4 py-4 flex items-center gap-4 border-t border-gray-200">
      <div className="flex flex-row">
        <AvatarWrapper css="w-16 h-16 mr-4">
          {/* Seller avatar and name */}
          <img
            src={user.avatar_url}
            alt={user.first_name}
            className="w-full object-cover rounded-full shadow-sm "
          />
        </AvatarWrapper>
        <div className="flex flex-col justify-center">
          <div className="text-xl font-semibold text-slate-700">
            {user.first_name}
          </div>
          <div className="text-xs text-gray-500">Community Seller</div>
        </div>
      </div>
      <MarketplaceZapsCountSection businessId={user.business_id} />
    </section>
  );
};
export default SellerPreviewSection;
