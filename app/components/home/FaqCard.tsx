"use client";

import { useState } from "react";
import { FaPlus, FaWindowClose } from "react-icons/fa";

type FaqProps = {
  title: string;
  description: string;
};
const FaqCard: React.FC<FaqProps> = ({ title, description }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center my-4 mx-3 p-4 cursor-pointer border-b border-gray-300 transition duration-300 hover:shadow-lg">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="w-3/4 font-bold">{title}</div>
          <div>
            {open ? (
              <FaWindowClose onClick={() => setOpen(false)} />
            ) : (
              <FaPlus onClick={() => setOpen(true)} />
            )}
          </div>
        </div>
        {open && <div className="mt-4 text-gray-500">{description}</div>}
      </div>
    </>
  );
};

export default FaqCard;
