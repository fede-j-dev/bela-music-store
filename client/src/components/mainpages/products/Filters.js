import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";

function Filters() {
  const state = useContext(GlobalState);
  const [genres] = state.genresAPI.genres;

  const [genre, setGenre] = state.productsAPI.genre;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  const [autofocusSearch, setAutofocusSearch] = state.autofocusSearch;

  const handleGenre = (e) => {
    setGenre(e.target.value);
    setSearch("");
  };
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    setAutofocusSearch(true);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Genres: </span>
        <select name="genre" value={genre} onChange={handleGenre}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option value={"genre=" + genre._id} key={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {autofocusSearch ? (
        <input
          type="text"
          autoFocus
          value={search}
          placeholder="Enter your search!"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      ) : (
        <input
          type="text"
          value={search}
          placeholder="Enter your search!"
          onChange={(e) => handleChange(e)}
        />
      )}

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
