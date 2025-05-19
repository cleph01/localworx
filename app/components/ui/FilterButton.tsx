"use client";

import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

type ButtonDetails = {
  css?: string;
  text: string;
  count?: number;
};

const FilterButton = ({ details }: { details: ButtonDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setIsOpen(false);
  };
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };
  //   useEffect(() => {
  //     document.addEventListener("click", handleOutsideClick);
  //     return () => {
  //       document.removeEventListener("click", handleOutsideClick);
  //     };
  //   }, []);

  console.log("isOpen", isOpen);
  return (
    <div
      className={`${details.css} flex flex-col border px-2 py-1 items-center justify-center rounded-lg shadow-lg transition duration-300`}
      onClick={() => toggleDropdown()}
    >
      <div className="flex flex-row items-center">
        <span className="mr-2">{details.text}</span>
        {details.count && (
          <span className="bg-black text-white">{details.count}</span>
        )}
        {isOpen ? <FaChevronUp /> : <FaChevronUp />}
      </div>

      <div className={`dropdown ${isOpen ? "block" : "hidden"}`}>
        <ul className="dropdown-menu space-y-2 mt-2">
          <li onClick={() => handleOptionClick("Option 1")}>Option 1</li>
          <li onClick={() => handleOptionClick("Option 2")}>Option 2</li>
          <li onClick={() => handleOptionClick("Option 3")}>Option 3</li>
        </ul>
      </div>
    </div>
  );
};
export default FilterButton;
