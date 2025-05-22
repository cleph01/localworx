// SellerPreviewSection.tsx
const SellerPreviewSection = ({
  seller,
  avatarUrl,
}: {
  seller: string;
  avatarUrl: string;
}) => {
  return (
    <section className="w-full max-w-4xl px-4 py-4 flex items-center gap-4 border-t border-gray-200">
      <img
        src={avatarUrl}
        alt={seller}
        className="w-12 h-12 rounded-full ring-2 ring-white"
      />
      <div>
        <p className="font-bold text-gray-700">Listed by {seller}</p>
        <p className="text-sm text-gray-500">Peer-to-peer resale item</p>
      </div>
    </section>
  );
};
export default SellerPreviewSection;
