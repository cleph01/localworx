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
      <div className="flex flex-col items-center my-4 mx-3">
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
      <hr className="text-slate-400" />
    </>
  );
};

export default FaqCard;
