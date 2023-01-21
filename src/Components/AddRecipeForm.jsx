import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { Button, Container, UncontrolledTooltip } from "reactstrap";

import "./Component.css";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";
import UserForm from "./UserForm";
import Notification from "./Notification";

import { addDoc, collection } from "@firebase/firestore";
import { db } from "../FireBaseInit";
import PopUpNotification from "../Views/PopUpNotification";
import { post_Data } from "../DataLayer/DataAccessLayer";

const AddRecipeForm = ({ handleSend, filechange }) => {
  const [bodyMessage, setBodyMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("Notification");
  const [notificationMsg, setnotificationMsg] = useState(
    "Transaction has occured..."
  );

  const handleCloseInfo = () => {
    window.location.reload(false);
    setShowInfo(false);
  };

  const innitilaState = {
    ingredientId: "",
    quantity: "",
    name: "",
    type: "",
  };

  const StepsInit = {
    stepid: "",
    name: "",
    timers: "",
  };

  const [forminput, setFormInput] = useState({});
  const [ingridients, setIngridients] = useState(innitilaState);
  const [ingredientArray, setIngredientArray] = useState([]);
  const [categories, setCategory] = useState([]);

  const [steps, setSteps] = useState(StepsInit);
  const [stepsArray, setStepsArray] = useState([]);

  const [submitMsg, setsubmitMsg] = useState("");

  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifTimer,setNotifTimer] =useState(2000)

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [showNotification]);

  const ingridientCategory = async () => {
    setIsLoading(true);
    if (localStorage.getItem("category") !== null) {
      const data = await JSON.parse(localStorage.getItem("category"));
      setCategory(data);
    }
    setIsLoading(false);
  };

  const formChange = (e) => {
    setFormInput({
      ...forminput,
      [e.target.name]: e.target.value,
      id: uuid(),
    });
  };

  const selectchange = (e) => {
    let countryArray = e.target.value.split(",");

    setFormInput({
      ...forminput,
      country: {
        name: countryArray[0],
        flagUrl: countryArray[1],
      },
    });
  };

  useEffect(() => {
    ingridientCategory();
  }, []);

  const getIngridients = (e) => {
    setIngridients({
      ...ingridients,
      [e.target.name]: e.target.value,
    });
  };

  const addIngridient = (e) => {
    if (ingridients.type === "") {
      setBodyMessage("please select ingridient type");
      alert("please select ingridient type");
      return false;
    }
    e.preventDefault();
    const newarray = [
      ...ingredientArray,
      {
        ...ingridients,
        ingredientId: uuid(),
      },
    ];
    setIngredientArray(newarray);
    setIngridients(innitilaState);
  };

  const removeIngridient = (e, id) => {
    e.preventDefault();
    const newarray = ingredientArray.filter((item) => item.ingredientId !== id);
    setIngredientArray(newarray);
    setnotificationMsg(`Document removed`);
    setNotificationTitle("Document Removed");
    setShowNotification(true);
    localStorage.setItem("ingredients", JSON.stringify(ingredientArray));
  };

  const getSteps = (e) => {
    setSteps({
      ...steps,
      [e.target.name]: e.target.value,
    });
  };

  const removeStep = (e, stepId) => {
    e.preventDefault();
    const stepsList = stepsArray.filter((step) => step.stepid !== stepId);
    setStepsArray(stepsList);
    setnotificationMsg(`Document removed`);
    setNotificationTitle("Document Removed");
    setShowNotification(true);
  };

  const addSteps = (e) => {
    e.preventDefault();
    const newArray = [
      ...stepsArray,
      {
        ...steps,
        stepid: stepsArray.length || 0,
      },
    ];
    setStepsArray(newArray);
    setSteps(StepsInit);
  };

  const notificationAct = () => {
    setShowInfo(false);
    navigate("/viewRecipes");
  };

  const PostRecipe = async (e) => {
    e.preventDefault();
    setsubmitMsg("Sending Data......");
    const recipe = {
      ...forminput,
      ingredients: ingredientArray,
      steps: stepsArray,
    };

    const result = await post_Data("recipe", 'recipe', "id");  
     setResponse(result.message);
     setnotificationMsg(result.message.toString());
     setNotificationTitle("Transaction Completed with code :", result.responseCode);
     setShowNotification(true);
     setsubmitMsg(result.message);
     setNotifTimer(4000)
  };



  return (
    <main>
      {isLoading ? (
        <h2>Loading ......</h2>
      ) : (
        <>
          <Container className="bg-light" fluid="fluid">
            <h2
              className="noReview recipeAuthor border rounded mt-1"
              style={{ textAlign: "left" }}
            >
              Add Recipe{" "}
            </h2>
          </Container>
          <div className="Container">
            <UserForm {...{ handleSend, formChange, selectchange }} />
            <Ingredients
              addIngridient={addIngridient}
              removeIngridient={removeIngridient}
              getIngridients={getIngridients}
              ingridients={ingridients}
              ingredientArray={ingredientArray}
              categories={categories}
            />
            <RecipeSteps
              removeStep={removeStep}
              steps={steps}
              getSteps={getSteps}
              addSteps={addSteps}
              stepsArray={stepsArray}
            />

            <div className="sendbtn">
              <Button
                active
                block
                size="lg"
                className="send bg-danger p-2 btn-lg"
                onClick={PostRecipe}
                id="saveIngid"
              >
                <span></span>
                <span></span>
                Save
              </Button>
              <UncontrolledTooltip placement="top" target="saveIngid">
                Submit your Recipe
              </UncontrolledTooltip>
            </div>
            <Notification
              showInfo={showInfo}
              ActionName={`New Recipe...`}
              notificationAct={notificationAct}
              handleCloseInfo={handleCloseInfo}
              infoTitle={submitMsg}
              bodyMessage={bodyMessage}
              infoType={""}
            />
          </div>
        </>
      )}
      <PopUpNotification
        notificationTitle={notificationTitle}
        notificationMsg={notificationMsg}
        showNotification={showNotification}
        timer = {notifTimer}
      />
    </main>
  );
};

export default AddRecipeForm;
