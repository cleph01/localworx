import React from "react";

type CardProps = {
  Header?: React.ReactNode;
  Content?: React.ReactNode;
  Footer?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  Header,
  Content,
  Footer,
  className = "",
}) => {
  return (
    <div
      className={`p-6 bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {Header && <div className="mb-4">{Header}</div>}
      {Content && <div className="text-gray-800">{Content}</div>}
      {Footer && (
        <div className="mt-4 pt-2 text-sm text-gray-500">{Footer}</div>
      )}
    </div>
  );
};

export default Card;
