import db from "@/db/db";

type SellerProfileSectionProps = {
  sellerId: number | string;
};
const SellerProfileSection = async ({
  sellerId,
}: SellerProfileSectionProps) => {
  const user = await db("users").where({ id: sellerId }).select("*").first();

  if (!user) {
    return <div className="text-gray-500">Seller not found</div>;
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <img
        className="inline-block h-16 w-16 rounded-full ring-2 ring-white shadow-sm"
        src={user.avatar_url ?? ""}
        alt={user.first_name}
      />
      <div className="flex flex-col justify-center">
        <div className="text-xl font-semibold text-slate-700 pl-2">
          {user.first_name}
        </div>
        <div className="text-xs text-gray-500">Community Seller</div>
      </div>
    </div>
  );
};

export default SellerProfileSection;
