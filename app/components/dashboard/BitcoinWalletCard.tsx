const BitcoinWalletCard = ({ wallet }: { wallet: string }) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold text-lg mb-2">⚡ Bitcoin Wallet</h3>
      <p className="text-gray-600 text-sm break-all">{wallet}</p>
    </div>
  );
};

export default BitcoinWalletCard;
