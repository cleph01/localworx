type PostLikesCountSectionProps = { userId: number | string };

const ZapsCountSection = ({ userId }: PostLikesCountSectionProps) => {
  const zapCount = 42; // This would typically come from props or state
  return (
    <span className="inline-flex text-center justify-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1.5 rounded-full font-semibold">
      ⚡ {zapCount}
    </span>
  );
};
export default ZapsCountSection;
