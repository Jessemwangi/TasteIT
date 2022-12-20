import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecipeSearch = () => {
  const navigation = useNavigate();
  const search = useRef();
  // const [searchData,setSearchData] = useState(search.current.value);

  const SearchHandler = (e) => {
    e.preventDefault();
    if (search.current.value) {

     console.log(search.current.value);
      navigation(`/viewRecipes/`,{state:{value:search.current.value || 'a'}});


    } else {
      alert(`Search Empty: can't search for empty data, retry..`);
      return false;
    }
  };
  return (
    <form id="form1" onSubmit={SearchHandler}>
      <div className="input-group md-form form-sm form-2 pl-0">
        <input
          className="form-control my-0 py-1 red-border"
          type="text"
          placeholder="Search"
          aria-label="Search"
          ref={search}
        />
        <div className="input-group-append">
          <span
            className="input-group-text red lighten-3"
            id="basic-text1"
            onClick={SearchHandler}
          >
            <FaSearch
              style={{ color: "red", fontSize: "28px", cursor: "pointer" }}
            />
          </span>
        </div>
      </div>
    </form>
  );
};

export default RecipeSearch;
