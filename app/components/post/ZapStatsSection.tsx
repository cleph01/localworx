// ZapStatsSection.tsx

import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import { PostZapSectionProps } from "../posts/postTypes";

const ZapStatsSection = async ({ data }: PostZapSectionProps) => {
  // mock fetch
  const zaps = await mockFetch(`/api/zaps?toUserId=${data.userId}`);

  if (!zaps) {
    return <div>No Zaps Found</div>;
  }

  let zapCount = zaps.data.length;

  return (
    <section className="max-w-4xl w-full bg-yellow-50 border border-yellow-200 rounded mx-4 px-4 py-4 my-6">
      <h2 className="text-xl font-bold mb-2">⚡ Zaps Received</h2>
      <p className="text-gray-700 text-lg font-semibold">
        {zapCount} ⚡ from supporters
      </p>
      <p className="text-sm text-gray-500">
        Supporters have tipped this post using Bitcoin on the Lightning Network.
      </p>
    </section>
  );
};

export default ZapStatsSection;
