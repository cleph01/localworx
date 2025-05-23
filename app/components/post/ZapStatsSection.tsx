// ZapStatsSection.tsx

const ZapStatsSection = ({ zapCount }: { zapCount: number }) => {
  return (
    <section className="bg-yellow-50 border border-yellow-200 rounded px-6 py-4 my-6 mx-6">
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
