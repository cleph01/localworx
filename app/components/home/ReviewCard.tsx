import React from "react";
import { FaStar } from "react-icons/fa";

type ReviewProps = {
  rating: number;
  review: string;
  name: string;
  businessName: string;
  avatarUrl: string;
};

const ReviewCard: React.FC<ReviewProps> = ({
  rating,
  review,
  name,
  businessName,
  avatarUrl,
}) => {
  return (
    <div className="flex flex-col mb-4 w-full min-h-76 p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-row my-4">
        {/* render the rating stars  */}
        {Array(rating)
          .fill(null)
          .map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
      </div>
      <div className="text-gray-400 mt-8">{review}</div>
      {/* wrapper to control spacing b/w children */}
      <div className="flex flex-row mt-6">
        <img
          className="inline-block size-15 rounded-full ring-2 ring-white"
          src={avatarUrl}
          alt=""
        />

        <div className="flex flex-col justify-center ml-2">
          <div className="font-bold capitalize">{name}</div>
          <div className="text-gray-400 capitalize">{businessName}</div>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
