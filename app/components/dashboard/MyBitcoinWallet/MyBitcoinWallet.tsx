"use client";

import useSWR from "swr";
import { useNostrUser } from "@/app/context/NostrUserContext";
import BitcoinWalletCard from "./BitcoinWalletCard";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch wallets");
    return res.json();
  });

const MyBitcoinWallet = () => {
  const { user } = useNostrUser();

  const { data: wallets, error, isLoading } = useSWR(
    user?.id ? `/api/lnbits/wallet?userId=${user.id}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
        <h2 className="text-3xl font-bold text-center">Loading Wallet...</h2>
        <p className="text-gray-500">
          Please wait while we fetch your lightning wallet.
        </p>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching wallets:", error);
  }

  return (
    <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Payment Settings</h2>
      {wallets && wallets.length > 0 ? (
        wallets.map((wallet: any) => (
          <BitcoinWalletCard
            key={wallet.id}
            businessId={wallet.business_id}
            walletName={wallet.wallet_name}
          />
        ))
      ) : (
        <section className="flex flex-col items-center justify-center gap-6 px-4 my-12">
          <p className="text-gray-500 font-medium">No wallets found.</p>
          <p className="text-gray-400 text-sm">
            A wallet is created automatically when you register a business.
          </p>
        </section>
      )}
    </section>
  );
};

export default MyBitcoinWallet;
