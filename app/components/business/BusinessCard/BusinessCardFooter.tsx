import Link from "next/link";
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
      <div className="flex flex-col gap-1">
        <BusinessCategorySection
          categoryId={category_id}
          clientSideFetch={clientSideFetch ?? false}
        />
        <Link
          href={`/business/${id}#reviews`}
          className="text-xs text-blue-500 hover:text-blue-600 transition-colors"
        >
          Write a review
        </Link>
      </div>
      <BusinessViewButton businessId={id} />
    </div>
  );
};

export default BusinessCardFooter;
