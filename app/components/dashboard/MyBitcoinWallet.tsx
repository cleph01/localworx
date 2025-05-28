import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import AddWalletForm from "./AddBitcoinWalletForm";
import BitcoinWalletCard from "./BitcoinWalletCard";

const MyBitcoinWallet = async () => {
  const userId = "1";

  const bitcoinWallet = await mockFetch(`/api/bitcoin-wallets/${userId}`);

  if (!bitcoinWallet) {
    return <div>No Bitcoin Wallets Found</div>;
  }

  const bitcoinWalletData = bitcoinWallet.data;

  return (
    <section className="min-w-85 sm:min-w-225 bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Payment Settings</h2>
      <BitcoinWalletCard walletId={bitcoinWalletData.walletId} />
      <AddWalletForm />
    </section>
  );
};

export default MyBitcoinWallet;
