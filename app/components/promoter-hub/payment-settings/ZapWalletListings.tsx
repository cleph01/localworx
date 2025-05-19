import { FaBitcoin } from "react-icons/fa";
import ZapWallAddressCard from "./ZapWalletAddressCard";

const zapAddresses = [
  "bc1qxyz1234567890abcdefg",
  "bc1qabc1234567890abcdefg",
  "bc1qdef1234567890abcdefg",
  "bc1qghi1234567890abcdefg",
];

const ZapWalletListings = () => {
  return (
    <div className="flex flex-col gap-4 my-4">
      <h2 className="inline-flex items-center text-lg font-semibold">
        <FaBitcoin className="text-orange-500 mr-2" />
        <span>Zap Wallet Listings</span>
      </h2>
      <p className="text-sm text-gray-500">
        Manage your Zap-Enabled Wallets here. You can add, edit, or remove
        wallets as needed.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {zapAddresses.length === 0 && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
            <p className="text-gray-500">No Zap Wallets found.</p>
          </div>
        )}
        {zapAddresses?.map((address, index) => (
          <ZapWallAddressCard key={index} address={address} />
        ))}
      </div>
    </div>
  );
};
export default ZapWalletListings;
