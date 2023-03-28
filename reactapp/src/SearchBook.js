import React from "react";

const SearchBook = ({ search, setSearch}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>

      <label htmlFor="search">Search</label>
      <input 
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Book"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBook;
