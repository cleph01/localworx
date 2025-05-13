import React from "react";

type StepsProps = {
  header: React.ReactNode;
  step: string;
  title: string;
  description: string;
};

const StepsCard: React.FC<StepsProps> = ({
  header,
  step,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
      <div className="min-h-32 flex flex-row items-center justify-center bg-background my-4">
        {header}
      </div>
      {/* wrapper to control spacing b/w children */}
      <div className="space-y-4">
        <div className="bg-gray-300 rounded w-8 p-1 text-center">{step}</div>
        <div className="font-bold">{title}</div>
        <div className="text-gray-400">{description}</div>
      </div>
    </div>
  );
};
export default StepsCard;
