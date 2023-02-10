import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../DataLayer/DataAccessLayer";

const HomeCategory = () => {
  const navigation = useNavigate();

  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { response, error, isLoading_ } = useGetData("category");
  useEffect(() => {
    if (isLoading_) {
      setIsLoading(isLoading_);
    }
    if (error) {
      setIsLoading(isLoading_);

      // console.log("An error occurred:", error);
    } else if (response) {
      setIsLoading(isLoading_);
      setCategory(response);
      if (localStorage.getItem("category") === null) {
        localStorage.setItem("category", JSON.stringify(response));
      }
    }
  }, [error, isLoading_, response]);

  return (
    <>
      {isLoading ? (
        <Spinner animation="grow" variant="light"></Spinner>
      ) : (
        <div className="bg-light m-2  rounded-bottom p-1 home_row">
          {category.map((cat) => (
            <div
              className="m-2 rounded-bottom home_col"
              key={cat.value}
              style={{
                backgroundImage: `url( https://source.unsplash.com/200x200/?${
                  cat.text === "Others"
                    ? "meal"
                    : cat.text.substring(0, cat.text.indexOf(" "))
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              // style={{backGround:`url(https://source.unsplash.com/100x100/?${cat.value} )`}}
              onClick={() =>
                navigation(`/viewRecipes/`, { state: { value: cat.value } })
              }
            >
              <div className="catCaption"> {cat.text}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomeCategory;
