import React from "react";

//search: valor que tenemos en useState
//handleSearch: función que cambia el search en el estado
//searchInput: referencia con useRef
const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="search">
      {/* Agregamos la referencia de useRef */}

      <input
        type={"text"}
        value={search}
        ref={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
