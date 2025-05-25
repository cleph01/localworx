import AddWalletForm from "./AddBitcoinWalletForm";
import BitcoinWalletCard from "./BitcoinWalletCard";

const MyBitcoinWallet = () => {
  return (
    <section className="min-w-85 sm:min-w-225 bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Payment Settings</h2>
      <BitcoinWalletCard wallet="lnbc1..." />
      <AddWalletForm />
    </section>
  );
};

export default MyBitcoinWallet;
