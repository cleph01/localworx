"use client";
import Link from "next/link";
//
// Because it's in the Dashboard, this entry-point component is client-side only,
// so we can use hooks like useFetchPromotionsByPromoter
// It has to be a client component because it uses hooks and Next.js 13's new app directory structure requires
// explicit client components for hooks
// But more importantly, this component is used in (sits in) the dashboard which is a client-side rendered page,
// and a server componnet cannot be rendered in a client-side rendered page - but the opposite is allowed,
// a client component can be rendered in a server-side rendered page.

import PromotionCard from "../../promotions/PromotionCard/PromotionCard";

import { FaPlusCircle } from "react-icons/fa";
import useSWR from "swr";

type MyPromotionSectionProps = {
  promoterId: number | string;
  clientSideFetch: boolean; // This prop is not used in this component, but can be used to conditionally fetch data
};

const MyPromotionsSection = ({
  promoterId,
  clientSideFetch,
}: MyPromotionSectionProps) => {
  // Fetch using client-side fetch

  // Client-side fetching of Promotion by Promoter ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("My promotions response was not ok");
      return res.json();
    });

  const searchUrl = `/api/promotions?promoterId=${promoterId}`;

  const { data: promotions, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return (
      <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching promotions:", error);
  }

  if (!promotions || promotions.length === 0) {
    return <div>No promotions found</div>;
  }

  return (
    <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-4">📣 Your Active Promotions</h2>
        <Link
          href="/dashboard/promotion/create"
          className="flex flex-row items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaPlusCircle className="h-4 w-4 mr-1" />
          Build a Promotion
        </Link>
      </div>
      {promotions?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.map((promo: any) => (
            <PromotionCard
              key={promo.id}
              promotion={promo}
              clientSideFetch={clientSideFetch}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You're not promoting any businesses yet.{" "}
          <a href="/promotions" className="text-blue-600 underline">
            Browse promotions
          </a>
          .
        </p>
      )}
    </section>
  );
};

export default MyPromotionsSection;
