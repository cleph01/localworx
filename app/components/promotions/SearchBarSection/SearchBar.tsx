"use client";

type SearchBarProps = {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
};

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <section className="w-full max-w-2xl flex flex-row items-center justify-center mt-6 px-6">
      <input
        type="text"
        className="w-full rounded-2xl px-4 py-2 shadow-sm border border-gray-300 focus:outline-none focus:ring focus:border-brand-orange"
        placeholder={placeholder || "Search by keyword..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
};

export default SearchBar;
