import React from "react";
import useSearch from "../../hooks/useSearch";

// This component renders a search input field with an associated search button.
const SearchBar = () => {
  const { query, setQuery, handleSearch } = useSearch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Search for food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className="btn btn-primary">Search</button>
    </div>
  );
};

export default SearchBar;
