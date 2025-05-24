import AddWalletForm from "./AddBitcoinWalletForm";
import BitcoinWalletCard from "./BitcoinWalletCard";

const MyBitcoinWallet = () => {
  return (
    <section className="max-w-4xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Payment Settings</h2>
      <BitcoinWalletCard wallet="lnbc1..." />
      <AddWalletForm />
    </section>
  );
};

export default MyBitcoinWallet;
