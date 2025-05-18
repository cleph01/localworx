import { FaSearch } from "react-icons/fa";

const SearchBarSection = () => {
  return (
    <section className="flex flex-row items-center justify-center w-full mt-6">
      <input
        type="text"
        placeholder="What service are you looking for?"
        className="grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        <FaSearch className="inline" />
      </button>
    </section>
  );
};
export default SearchBarSection;
