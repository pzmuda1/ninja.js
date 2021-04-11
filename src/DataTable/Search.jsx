import React from "react";

const Search = ({ onSearch }) => {
  return (
    <div className="p-b-1">
      <input
        type="search"
        className="form-control"
        placeholder="Søg brugere"
        onChange={(event) => onSearch(event.target.value)}
        aria-label="search-input"
      />
    </div>
  );
};

export default Search;
