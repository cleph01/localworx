// ZapStatsSection.tsx

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

type PostZapSectionProps = {
  userId: number | string;
};

const ZapStatsSection = async ({ userId }: PostZapSectionProps) => {
  // TODO: Replace with actual Zap fetch logic

  let zapCount = 139;

  return (
    <section className="max-w-4xl bg-yellow-50 border border-yellow-200 rounded mx-4 px-4 py-4 my-6">
      <h2 className="text-xl font-bold mb-2">⚡ Zaps Received</h2>
      <p className="text-gray-700 text-lg font-semibold">
        {/* if zapCount === 0 then at least display 1 */}
        {!zapCount ? "1" : zapCount} ⚡ from supporters
      </p>
      <p className="text-sm text-gray-500">
        Supporters have tipped this post using Bitcoin on the Lightning Network.
      </p>
    </section>
  );
};

export default ZapStatsSection;
