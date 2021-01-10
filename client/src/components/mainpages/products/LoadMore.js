import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [result] = state.productsAPI.result;
  const [autofocousSearch, setAutofocusSearch] = state.autofocusSearch;

  const handleClick = () => {
    setPage(page + 1);
    setAutofocusSearch(false);
  };

  return (
    <div className="load_more">
      {result < page * 9 ? (
        ""
      ) : (
        <button onClick={() => handleClick()}>Load more</button>
      )}
    </div>
  );
}

export default LoadMore;
