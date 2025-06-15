"use client";

import SearchBar from "./SearchBar";
import FiltersPanel from "./FiltersPanel";

type SearchBarSectionProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  category: string;
  setCategory: (category: string) => void;
  hiring: boolean;
  setHiring: (hiring: boolean) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
};
// This component is a client-side component for the services directory page.
const SearchBarSection = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  hiring,
  setHiring,
  sortBy,
  setSortBy,
}: SearchBarSectionProps) => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search for services..."
      />
      <FiltersPanel
        category={category}
        onCategoryChange={setCategory as (category: string) => void}
        hiring={hiring}
        onHiringToggle={() => setHiring(!hiring)}
        sortBy={sortBy}
        onSortByChange={setSortBy as (sortBy: string) => void}
      />
    </div>
  );
};

export default SearchBarSection;
