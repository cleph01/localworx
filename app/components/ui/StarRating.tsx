import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
  reviewCount: number;
};

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  if (reviewCount === 0) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaRegStar key={i} className="text-gray-300 text-sm" />
        ))}
        <span className="text-xs text-gray-400 ml-1">No reviews yet</span>
      </div>
    );
  }

  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) return <FaStar key={i} className="text-yellow-400 text-sm" />;
    if (rating >= i - 0.5) return <FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />;
    return <FaRegStar key={i} className="text-yellow-400 text-sm" />;
  });

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="text-sm font-semibold text-gray-700 ml-1">{rating}</span>
      <span className="text-xs text-gray-400">({reviewCount})</span>
    </div>
  );
}
