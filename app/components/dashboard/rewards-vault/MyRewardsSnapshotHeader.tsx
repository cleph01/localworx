type MyRewardsSnapshotHeaderType = {
  count: number; // The count to display in the header
};

const MyRewardsSnapshotHeader = ({ count }: MyRewardsSnapshotHeaderType) => (
  <div className="flex flex-col items-start mb-4">
    <h2 className="text-2xl font-bold mb-2">
      {count} {count > 1 || count == 0 ? "items" : "item"}
    </h2>
    <p className="text-sm text-gray-600 mb-1">in your rewards vault.</p>
  </div>
);

export default MyRewardsSnapshotHeader;
