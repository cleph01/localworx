"use client";

import useSWR from "swr";

type SellerProfileSectionProps = {
  sellerId: number | string;
};
const SellerProfileSection = ({ sellerId }: SellerProfileSectionProps) => {
  // Client-side fetching of user by seller ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promotion card promoter details response was not ok");
      return res.json();
    });

  const searchUrl = `/api/users/${sellerId}`;

  const { data: user, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) return <div className="text-gray-500">Loading seller...</div>;

  if (error) {
    return (
      <div className="text-red-500">Error loading seller: {error.message}</div>
    );
  }
  // If user is not found, return a message
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
        <div className="text-xl font-semibold text-slate-700">
          {user.first_name}
        </div>
        <div className="text-xs text-gray-500">Community Seller</div>
      </div>
    </div>
  );
};

export default SellerProfileSection;
