"use client";
//
//// Because it's in the Dashboard, this entry-point component is client-side only,
// This component is client-side only, so we can use hooks like useFetchMyBusinesses
// It has to be a client component because it uses hooks and Next.js 13's new app directory structure requires
// explicit client components for hooks
// But more importantly, this component is used in (sits in) the dashboard which is a client-side rendered page,
// and a server componnet cannot be rendered in a client-side rendered page - but the opposite is allowed,
// a client component can be rendered in a server-side rendered page.

import Link from "next/link";
import BusinessCard from "../business/BusinessCard/BusinessCard";
import { FaPlusCircle } from "react-icons/fa";
import { useFetchMyBusinesses } from "@/app/hooks/dashboard/MyBusinessesSection/useFetchMyBusinesses";

const MyBusinessesSection = ({
  clientSideFetch,
  ownerId,
}: {
  clientSideFetch: boolean;
  ownerId: string | number;
}) => {
  // If clientSideFetch is true, we will use the custom hook to fetch businesses
  // If false, we will use server-side fetch to get the businesses
  // This allows us to control where the data fetching happens based on the context

  const { businesses, loading, error } = useFetchMyBusinesses(ownerId);

  if (loading) {
    return <div className="text-gray-500">Loading businesses...</div>;
  }
  if (error) {
    console.error("Error fetching businesses:", error);
  }

  return (
    <section className="max-w-4xl bg-white rounded-lg shadow-sm border border-gray-400 px-4 py-6 mb-6">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-4">
          🏪 Your Businesses{" "}
          <span className="text-gray-400">({businesses.length})</span>
        </h2>

        <Link
          href="/dashboard/business/create"
          className="flex flex-row items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaPlusCircle className="h-4 w-4 mr-1" />
          Add Business
        </Link>
      </div>

      {businesses.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses?.map((business: any) => (
            <BusinessCard
              key={business.id}
              business={business}
              clientSideFetch={clientSideFetch}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You haven’t created any businesses yet.{" "}
          <a href="/business/create" className="text-blue-600 underline">
            Start one now.
          </a>
        </p>
      )}
    </section>
  );
};

export default MyBusinessesSection;
