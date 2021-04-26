import React from "react";
import "./index.scss";

function SearchBar({ setFilters }) {
  const onChange = (event) => {
    setFilters(event.target.value);
  };

  return (
    <div className="searchBar">
      <h1>Search for your dream job</h1>
      <input type="text" name="filters" placeholder="e.g. Python" onChange={(event) => onChange(event)} />
    </div>
  );
}

export default SearchBar;
