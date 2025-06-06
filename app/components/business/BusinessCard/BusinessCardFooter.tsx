import BusinessViewButton from "../BusinessViewButton";
import BusinessCategorySection from "./BusinessCategorySection";

type BusinessCardFooterType = {
  id: string;
  category_id: string;
  clientSideFetch?: boolean;
};

const BusinessCardFooter = ({
  id,
  category_id,
  clientSideFetch,
}: BusinessCardFooterType) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <BusinessCategorySection
        categoryId={category_id}
        clientSideFetch={clientSideFetch ?? false}
      />
      {/* View Item */}
      <BusinessViewButton businessId={id} />
    </div>
  );
};

export default BusinessCardFooter;
