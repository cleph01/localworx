// app/components/ProfileCard.tsx
import React from "react";

type FeaturesCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const HomeFeaturesCard: React.FC<FeaturesCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="p-6 relative bg-white rounded-lg shadow-lg overflow-hidden w-80 sm:w-88 md:w-96">
      {/* Icon */}
      <div className="mb-6">{icon}</div>

      {/* Body */}

      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default HomeFeaturesCard;
