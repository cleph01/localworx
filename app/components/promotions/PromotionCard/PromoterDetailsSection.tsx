import PromoterProfileSection from "./PromoterProfileSection";

/**
 * Top Level / Main Entry component
 */
export type promoterDetailsSectionProps = {
  promoterId: number | string;
  clientSideFetch: boolean;
};

const PromoterDetailsSection = ({
  promoterId,
  clientSideFetch,
}: promoterDetailsSectionProps) => {
  return (
    <section className="w-full max-w-4xl flex flex-col border-t border-gray-200 mt-1 mb-8 py-2 gap-2 px-4">
      <PromoterProfileSection
        promoterId={promoterId}
        clientSideFetch={clientSideFetch}
      />
    </section>
  );
};

export default PromoterDetailsSection;
