import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { Button, Container, UncontrolledTooltip } from "reactstrap";

import "./Component.css";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";
import UserForm from "./UserForm";
import Notification from "./Notification";

import PopUpNotification from "../Views/PopUpNotification";
import { post_Data, useGetData } from "../DataLayer/DataAccessLayer";
import { UserAuth } from "../DataLayer/Context/Context";

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

const AddRecipeForm = ({ handleSend }) => {
  const [bodyMessage, setBodyMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
const {user,isAuthenticated, isAnonymous} =UserAuth()
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("Notification");
  const [notificationMsg, setnotificationMsg] = useState(
    "Transaction has occured..."
  );
  const { response:catResponse, error, isLoading_ } = useGetData('category');
  const handleCloseInfo = () => {
    window.location.reload(false);
    setShowInfo(false);
  };
  const [forminput, setFormInput] = useState({
    userId: isAuthenticated  ? user.uid : "guest",
    author: isAuthenticated ? user.displayName : "",
  });

  const [ingridients, setIngridients] = useState(innitilaState);
  const [ingredientArray, setIngredientArray] = useState([]);
  const [categories, setCategory] = useState([]);

  const [steps, setSteps] = useState(StepsInit);
  const [stepsArray, setStepsArray] = useState([]);

  const [submitMsg, setsubmitMsg] = useState("");

  const [ setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifTimer,setNotifTimer] =useState(2000)

  useEffect(() => {
    if (showNotification) {
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [showNotification]); 
  useEffect(() => {
  setFormInput(prev => ({
    ...prev,
    userId: isAuthenticated ? user.uid : "guest",
    author: isAuthenticated ? (user.displayName || user.email || "") : "",
  }));
}, [user, isAuthenticated]);

  const formChange = (e) => {
    setFormInput({
      ...forminput,
      [e.target.name]: e.target.value,
      id: uuid(),
    });
  };

  const handleCountrySelect  = ({ countryName, flagUrl }) => {

    setFormInput({
      ...forminput,
      country: {
      name: countryName,
      flagUrl: flagUrl,
    },
    });
  };

  useEffect(() => {
     const ingridientCategory = async () => {
    setIsLoading(true);
    if (localStorage.getItem("category") !== null) {
      const data = await JSON.parse(localStorage.getItem("category"));
      setCategory(data);
    }
    else {
      // const { response, error, isLoading_ } = useGetData("category"); 
      if (isLoading_) {
        setIsLoading(isLoading_); 
      }
      if (error) {
        setIsLoading(isLoading_);
        setNotificationTitle("Error fetching categories");
        setnotificationMsg(`The following error occurred: ${error}`);
        setShowNotification(true);
      }
      else if (catResponse) {
        setIsLoading(isLoading_); 
        setCategory(catResponse);
        localStorage.setItem("category", JSON.stringify(catResponse)); 
      }
    }
    setIsLoading(false);
  };
    ingridientCategory();
  }, [catResponse, error, isLoading_]);

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
    const result = await post_Data("recipe", recipe, "id");  
    const {message,responseCode} = result
     setResponse(message);
     setnotificationMsg(message.toString());
     setNotificationTitle("Transaction Completed with code :", responseCode);
     setShowNotification(true);
     setsubmitMsg(message);
     setNotifTimer(4000)
    
     if(responseCode === 200){
      navigate(`/viewRecipe/${recipe.id}`)
     }
  };

  return (
   <main className="py-4 bg-light min-vh-100">
  {isLoading ? (
    <h2 className="text-center">Loading ......</h2>
  ) : (
    <>
      <Container fluid className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-start recipeAuthor border-bottom pb-2">Add Recipe</h2>
      </Container>

      <Container>
        <UserForm {...{ handleSend, formChange, handleCountrySelect ,forminput}} />
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

        <div className="text-center mt-4">
          <Button
            block
            size="lg"
            className="btn-danger"
            onClick={PostRecipe}
            id="saveIngid"
          >
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
      </Container>
    </>
  )}
  <PopUpNotification
    notificationTitle={notificationTitle}
    notificationMsg={notificationMsg}
    showNotification={showNotification}
    timer={notifTimer}
  />
</main>
  );
};

export default AddRecipeForm;
