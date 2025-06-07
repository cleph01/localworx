type RewardsIssuedCardFooterProps = {
  redeemed: boolean;
  resold: boolean;
  grantedAt: string; // ISO date string
};

const RewardsIssuedCardFooter = ({
  redeemed,
  resold,
  grantedAt,
}: RewardsIssuedCardFooterProps) => {
  return (
    <div className="text-sm text-gray-700">
      <p>
        <strong>Status:</strong>
        {redeemed ? "Redeemed" : resold ? "Resold" : "Available"}
      </p>
      <p className="text-xs text-gray-500">
        Granted on: {new Date(grantedAt).toLocaleDateString()}
      </p>

      {/* Action Buttons */}
      {!redeemed && !resold && (
        <div className="flex gap-2 mt-2">
          <button className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700">
            Redeem
          </button>
          <button className="px-3 py-1 rounded bg-yellow-500 text-white text-sm hover:bg-yellow-600">
            Sell
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-sm">
            Details
          </button>
        </div>
      )}
      {redeemed && (
        <span className="inline-block text-green-700 font-medium">
          ✅ Redeemed
        </span>
      )}
      {resold && (
        <span className="inline-block text-blue-600 font-medium">
          🛒 Listed on Marketplace
        </span>
      )}
    </div>
  );
};

export default RewardsIssuedCardFooter;
