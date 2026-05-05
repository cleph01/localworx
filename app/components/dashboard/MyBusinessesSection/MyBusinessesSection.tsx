"use client";

import { useState } from "react";
import Link from "next/link";
import BusinessCard from "../../business/BusinessCard/BusinessCard";
import { FaPlusCircle } from "react-icons/fa";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("My Businesses response was not ok");
    return res.json();
  });

function SetupWalletButton({
  businessId,
  userId,
  onSuccess,
}: {
  businessId: number;
  userId: string | number;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSetupWallet() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/lnbits/wallet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, userId }),
      });
      if (!res.ok) throw new Error("Wallet setup failed");
      onSuccess();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm flex items-center justify-between gap-2">
      <span className="text-yellow-700 font-medium">⚡ No wallet linked</span>
      {error && <span className="text-red-500 text-xs">Failed — retry?</span>}
      <button
        onClick={handleSetupWallet}
        disabled={loading}
        className="text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-1 rounded-full disabled:opacity-50"
      >
        {loading ? "Setting up…" : "Set up wallet"}
      </button>
    </div>
  );
}

const MyBusinessesSection = ({
  clientSideFetch,
  ownerId,
}: {
  clientSideFetch: boolean;
  ownerId: string | number;
}) => {
  const searchUrl = `/api/businesses?ownerId=${ownerId}`;
  const { data: businesses, error, isLoading, mutate } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return (
      <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching businesses:", error);
  }

  if (!businesses || businesses.length === 0) {
    return (
      <section className="w-full bg-white rounded-xl border border-dashed border-gray-300 px-6 py-10 flex flex-col items-center gap-3 text-center">
        <span className="text-4xl">🏪</span>
        <h2 className="text-lg font-bold text-gray-800">No businesses yet</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Register your first business to start accepting Bitcoin payments,
          posting promotions, and earning rewards.
        </p>
        <Link
          href="/dashboard/business/create"
          className="mt-2 inline-flex items-center gap-2 bg-brand-orange hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <FaPlusCircle /> Add Your First Business
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-6">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold mb-4">
          🏪 Your Businesses{" "}
          <span className="text-gray-400">({businesses?.length})</span>
        </h2>

        <Link
          href="/dashboard/business/create"
          className="flex flex-row items-center text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          <FaPlusCircle className="h-4 w-4 mr-1" />
          Add Business
        </Link>
      </div>

      {businesses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business: any) => (
            <div key={business.id}>
              <BusinessCard
                business={business}
                clientSideFetch={clientSideFetch}
              />
              {!business.has_wallet && (
                <SetupWalletButton
                  businessId={business.id}
                  userId={ownerId}
                  onSuccess={() => mutate()}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          You haven't created any businesses yet.{" "}
          <a href="/business/create" className="text-blue-600 underline">
            Start one now.
          </a>
        </p>
      )}
    </section>
  );
};

export default MyBusinessesSection;
