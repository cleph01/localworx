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
    <div className="flex flex-col w-full p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      <div className="flex flex-row gap-0.5 mb-4">
        {Array(rating)
          .fill(null)
          .map((_, index) => (
            <FaStar key={index} className="text-brand-orange" />
          ))}
      </div>
      <p className="text-gray-500 flex-1 leading-relaxed">
        &ldquo;{review}&rdquo;
      </p>
      <div className="flex flex-row items-center mt-6 gap-3">
        <img
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
          src={avatarUrl}
          alt={name}
        />
        <div className="flex flex-col">
          <span className="font-semibold capitalize text-sm">{name}</span>
          <span className="text-gray-400 capitalize text-xs">{businessName}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
