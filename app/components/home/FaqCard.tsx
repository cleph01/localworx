"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

type FaqProps = {
  title: string;
  description: string;
};

const FaqCard: React.FC<FaqProps> = ({ title, description }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full p-4 cursor-pointer border-b border-gray-200 transition-all duration-200 hover:bg-gray-50 rounded-lg"
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <span className="font-semibold text-sm">{title}</span>
        <span className="text-brand-orange shrink-0">
          {open ? <FaMinus className="h-3 w-3" /> : <FaPlus className="h-3 w-3" />}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default FaqCard;
