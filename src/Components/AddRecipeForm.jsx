import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import { Button, Container, UncontrolledTooltip } from "reactstrap";

import "./Component.css";
import Ingredients from "./Ingredients";
import RecipeSteps from "./RecipeSteps";
import UserForm from "./UserForm";
import Notification from "./Notification";

import { addDoc, collection, } from "@firebase/firestore";
import { db } from '../FireBaseInit';


const AddRecipeForm = ({ handleSend, filechange }) => {
  const [bodyMessage, setBodyMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleCloseInfo = () => {
    window.location.reload(false);
    setShowInfo(false)
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

  const ingridientCategory = async () => {
    setIsLoading(true);
    if (localStorage.getItem('category') !== null){
      const  data = await JSON.parse(localStorage.getItem('category'));
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
    localStorage.setItem("ingredients", JSON.stringify(ingredientArray));
  };

  const getSteps = (e) => {
    setSteps({
      ...steps,
      [e.target.name]: e.target.value,
    });
  };

  const removeStep = (e) => { };

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
  }


  const PostRecipe = async (e) => {
    e.preventDefault();
    setsubmitMsg("Sending Data......");
    const recipe = {
      ...forminput,
      ingredients: ingredientArray,
      steps: stepsArray,
    };
    const result = await post_Data('recipe', recipe, 'id')
    setsubmitMsg(result);
    console.log(result);

  };

  const post_Data = async (collectionName, data, idColName) => {  //idColName the id column name, ed Id, transactionID

    try {
      await addDoc(collection(db, collectionName), data)
        .then(docRef => {
          setResponse("Document has been added successfully")
        });

    } catch (error) {
      setResponse(`An error occured ... ${error}`);
    }
    setIsLoading(false);
    return response;
  }


  return (
 

    <main>
         {isLoading ? 
      (
      <h2>Loading ......</h2>
    ):(
      <>
      <Container className="bg-light" fluid="fluid" >

        <h2 className='noReview recipeAuthor border rounded mt-1' style={{ textAlign: "left" }}>Add Recipe </h2>
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
        <Notification showInfo={showInfo} ActionName={`New Recipe...`}
          notificationAct={notificationAct} handleCloseInfo={handleCloseInfo}
          infoTitle={submitMsg} bodyMessage={bodyMessage} infoType={''} />
      </div>
      </>
    )}
    </main>
  );
};

export default AddRecipeForm;
