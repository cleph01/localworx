import { FaBitcoin } from "react-icons/fa";

const brandValues = {
  nostr: {
    text: "Powered by Nostr",
    icon: "/nostr-logo.svg",
    imgCss: "w-12 h-12",
  },
  bitcoin: {
    text: "Monetized by Bitcoin",
    icon: FaBitcoin,
    iconCss: "w-12 h-12 text-orange-500",
  },
  localWorx: {
    text: "Driven by Local Content",
    icon: "/localworx-logo.svg",
    imgCss: "w-12 h-12",
  },
};

const BrandIconButtonSection = () => {
  return (
    <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 my-4">
      <BrandIconCard
        details={{
          imgCss: brandValues.nostr.imgCss,
          text: brandValues.nostr.text,
          icon: brandValues.nostr.icon,
        }}
      />

      <BrandIconCard
        details={{
          iconCss: brandValues.bitcoin.iconCss,
          text: brandValues.bitcoin.text,
          icon: brandValues.bitcoin.icon,
        }}
      />
      <BrandIconCard
        details={{
          text: brandValues.localWorx.text,
          icon: brandValues.localWorx.icon,
          imgCss: brandValues.localWorx.imgCss,
        }}
      />
    </div>
  );
};

export default BrandIconButtonSection;

type BrandIconCardDetails = {
  iconCss?: string;
  imgCss?: string;
  btnCss?: string;
  text: string;
  icon: string | React.ComponentType<{ className?: string }>;
};

const BrandIconCard = ({ details }: { details: BrandIconCardDetails }) => {
  return (
    <div
      className={`${details.btnCss} w-80 flex flex-row items-center bg-white border border-gray-400 rounded-lg p-4 `}
    >
      <div
        className={`${details.imgCss} flex items-center justify-center mr-4`}
      >
        {typeof details.icon === "string" ? (
          <img src={details.icon} alt="icon" />
        ) : (
          <details.icon className={details.iconCss} />
        )}
      </div>
      <div className="text-gray-500 font-semibold">{details.text}</div>
    </div>
  );
};
