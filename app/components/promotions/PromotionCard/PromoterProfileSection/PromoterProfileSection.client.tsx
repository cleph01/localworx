"use client";
// This component is client-side only,

import Button from "@/app/components/ui/Button";

import PromoterRatingSection from "../PromoterRatingSection";
import PromoterMetricsSection from "../PromoterMetricsSection";
import { PromoterProfileSectionProps } from ".";
import useSWR from "swr";

const PromoterProfileSection = ({
  promoterId,
  clientSideFetch,
}: PromoterProfileSectionProps) => {
  // Client-side fetching of user by promoter ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promotion card promoter details response was not ok");
      return res.json();
    });

  const searchUrl = `/api/users/${promoterId}`;

  const { data: promoter, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) return <div className="text-gray-500">Loading...</div>;

  if (error)
    return <div className="text-red-500">Error loading promoter profile</div>;

  if (!promoter) return <div className="text-gray-500">Promoter not found</div>;

  return (
    <div className="flex flex-col mt-2 gap-2">
      <p className="text-gray-500 text-sm mt-1">Promotion By:</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center mr-1 mt-1 gap-2">
          <img
            className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
            src={promoter?.avatar_url ?? ""}
            alt={promoter?.first_name}
          />
          <div className="flex flex-col flex-1">
            <div className="text-lg sm:text-base font-semibold">
              {promoter?.first_name}
            </div>
            <PromoterRatingSection
              promoterId={promoterId}
              clientSideFetch={clientSideFetch}
            />
          </div>
        </div>

        <PromoterMetricsSection
          promoterId={promoterId}
          clientSideFetch={clientSideFetch}
        />
      </div>

      {/* CTA - Zap Button */}
      <Button
        details={{
          text: "⚡️ Zap It!",
          css: "w-full flex-1 mt-4 py-2 bg-orange-500 text-white text-base font-bold",
        }}
      />
    </div>
  );
};

export default PromoterProfileSection;
