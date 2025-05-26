// app/components/ProfileCard.tsx
import React from "react";

type ProfileCardProps = {
  name: string;
  category: string;
  accolades: string[];
  imageUrl: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  category,
  accolades,
  imageUrl,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-64 sm:w-72 md:w-80 mb-6">
      {/* Profile Picture */}
      <div className="w-full h-3/4 overflow-hidden p-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-64 mt-2 rounded-xl border border-gray-200 object-cover shadow-sm "
        />
      </div>

      {/* Footer Section */}
      <div className="px-4 pb-4 flex flex-col space-y-1 bg-white">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm font-bold text-gray-400">{category}</p>
        <ul className="text-xs text-gray-500 list-inside">
          {accolades.map((accolade, index) => (
            <li key={index}>🔹 {accolade}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
