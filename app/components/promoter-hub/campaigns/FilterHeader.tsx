import FilterButton from "../../ui/FilterButton";

const statusDetails = {
  css: "text-gray-500 mr-4",
  text: "Active",
};

const dateRangeDetails = {
  css: "text-gray-500",
  text: "This month",
};

const FilterHeader = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <FilterButton
        details={{
          css: statusDetails.css,
          text: statusDetails.text,
        }}
      />
      <FilterButton
        details={{
          css: dateRangeDetails.css,
          text: dateRangeDetails.text,
        }}
      />
    </div>
  );
};

export default FilterHeader;
