import React, { useState } from "react";
import { Search } from "lucide-react"; // Importing the search icon

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-center mt-2 mb-2">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for medicines..."
          value={query}
          onChange={handleSearch}
          className="p-2 pl-10 bg-gray-100  rounded-md w-[600px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
