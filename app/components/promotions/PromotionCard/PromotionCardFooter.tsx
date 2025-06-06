import PromoterDetailsSection from "./PromoterDetailsSection";

type PromotionCardFooterType = {
  promoterId: number | string;
  clientSideFetch: boolean;
};
const PromotionCardFooter = ({
  promoterId,
  clientSideFetch,
}: PromotionCardFooterType) => {
  return (
    /* Promoter Info */
    <PromoterDetailsSection
      promoterId={promoterId ?? ""}
      clientSideFetch={clientSideFetch}
    />
  );
};

export default PromotionCardFooter;
