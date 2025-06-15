"use client";
// components/ui/SearchBar.tsx
import { useState } from "react";

type SearchBarProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  }

  return (
    <section className="w-full max-w-2xl flex flex-row items-center justify-center mt-6 px-6 ">
      <input
        type="text"
        className="w-full rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        placeholder={placeholder || "Search by keyword..."}
        value={localValue}
        onChange={handleChange}
      />
    </section>
  );
};
export default SearchBar;
