import React from "react";

type CardProps = {
  Header?: React.ReactNode;
  Content?: React.ReactNode;
  Footer?: React.ReactNode;
  css?: string;
};

const Card: React.FC<CardProps> = ({ Header, Content, Footer, css = "" }) => {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-lg overflow-hidden ${css}`}>
      {Header && <div className="mb-4">{Header}</div>}
      {Content && <div className="text-gray-800">{Content}</div>}
      {Footer && <div className="pt-2 text-sm text-gray-500">{Footer}</div>}
    </div>
  );
};

export default Card;
