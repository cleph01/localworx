import React from "react";

type StepsProps = {
  header: React.ReactNode;
  step: string;
  title: string;
  description: string;
};

const HomeStepsCard: React.FC<StepsProps> = ({
  header,
  step,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md">
      <div className="h-1/2">{header}</div>
      <div className="bg-gray-500">{step}</div>
      <div className="font-bold">{title}</div>
      <div className="text-gray-400">{description}</div>
    </div>
  );
};
export default HomeStepsCard;
