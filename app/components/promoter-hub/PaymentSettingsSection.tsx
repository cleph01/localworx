import AddNewWallet from "./payment-settings/AddNewWallet";
import ZapWalletListings from "./payment-settings/ZapWalletListings";

// Sample data for the button
const buttonData = {
  css: "mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold",
  text: "Create a new post",
};

const PaymentSettingsSection = () => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="flex flex-col border rounded border-gray-400 p-4 space-y-4">
        <h2 className="text-2xl font-bold">Payment Settings</h2>

        {/* Add New Bitcoin Wallet */}
        <AddNewWallet />
      </div>

      {/* List Bitcoin Wallets */}
      <ZapWalletListings />
    </section>
  );
};
export default PaymentSettingsSection;
