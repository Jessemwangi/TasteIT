import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

const RecipeSearch = () => {
  const navigation = useNavigate();
  const search = useRef();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const SearchHandler = (e) => {
    e.preventDefault();
    if (search.current.value) {

      navigation(`/viewRecipes/`, { state: { value: search.current.value || '' } });

    } else {
      setShow(true);
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
        <Notification showInfo={show} handleCloseInfo={handleClose}
          bodyMessage={`Your Search value is Empty: I can't search for an empty data, Type something and then retry..`}
          infoTitle={'Missing search Value'} notificationAct={handleClose}
          ActionName={'Retry'} infoType={'input not found'} />
      </div>
    </form>
  );
};

export default RecipeSearch;
