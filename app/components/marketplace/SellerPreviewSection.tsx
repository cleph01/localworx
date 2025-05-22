// SellerPreviewSection.tsx
const SellerPreviewSection = ({
  seller,
  avatarUrl,
  zapCount,
}: {
  seller: string;
  avatarUrl: string;
  zapCount: string;
}) => {
  return (
    <section className="w-full max-w-4xl px-4 py-4 flex items-center gap-4 border-t border-gray-200">
      <div className="flex flex-row">
        <img
          src={avatarUrl}
          alt={seller}
          className="w-12 h-12 rounded-full ring-2 ring-white"
        />
        <div>
          <p className="font-bold text-gray-700">Listed by {seller}</p>
          <p className="flex-1 text-sm text-gray-500">
            Peer-to-peer resale item
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex-1 text-xs text-gray-600">⚡ Zaps Received:</div>
        <div className="flex-0 ml-1 text-xs text-gray-600 font-bold">
          {zapCount}
        </div>
      </div>
    </section>
  );
};
export default SellerPreviewSection;
