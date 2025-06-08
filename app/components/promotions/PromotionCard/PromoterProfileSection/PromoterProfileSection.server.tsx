import Button from "@/app/components/ui/Button";

import db from "@/db/db";
import PromoterRatingSection from "../PromoterRatingSection";
import { PromoterProfileSectionProps } from ".";
import PromoterMetricsSection from "../PromoterMetricsSection";

const PromoterProfileSection = async ({
  promoterId,
  clientSideFetch,
}: PromoterProfileSectionProps) => {
  const user = await db("users")
    .where({ id: Number(promoterId) })
    .first();

  if (!user) return <div className="text-gray-500">Promoter not found</div>;

  return (
    <div className="flex flex-col mt-2 gap-2">
      <p className="text-gray-500 text-sm mt-1">Promotion By:</p>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center mr-1 mt-1 gap-2">
          <img
            className="inline-block h-16 w-16 rounded-full ring-2 ring-white"
            src={user.avatar_url ?? ""}
            alt={user.first_name}
          />
          <div className="flex flex-col flex-1">
            <div className="text-lg sm:text-base font-semibold">
              {user.first_name}
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
