const SellerZapCountSection = () => {
  const zapCount = 42; // This would be replaced with actual logic to fetch the zap count

  return (
    <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
      ⚡ {zapCount} zaps
    </span>
  );
};

export default SellerZapCountSection;
