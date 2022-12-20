import React, { useEffect, useState } from "react";
import { Link,  useLocation , useNavigate} from "react-router-dom";
import axios from "axios";
import { Button, Spinner } from "reactstrap";

import FilterRecipeByType from "../Components/FilterRecipeByType";
import { Container } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

const RecipeViewCard = () => {
  let location = useLocation();
const navigate = useNavigate();

  let search ;
  if (location.state?.value.length > 1) {
    search = location.state?.value;
  }

  const [recipes, setRecipes] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [type,setType] = useState('');

  const getRecipes = async () => {
    setIsloading(true);
    const { data } = await axios.get("http://localhost:3001/recipe");
    setRecipes(data);
    setIsloading(false);
  };

  useEffect(() => {
    getRecipes();
  }, [search]);

  useEffect(() => {
    setIsloading(true);

    const filterByTypeFn = (searchValue) =>{
    let  recipeList=[];
      recipes.forEach(recipe => {
        const ingredients = recipe.ingredients.filter(ingredient => ingredient.type === searchValue);
        if (ingredients.length > 0) {
          recipeList.push(recipe.name);
        }
      });
    
      return recipeList;
    }

    let filteredRecipes =[];
 
    if(recipes.length > 0){
    if (!search && !type) {
       filteredRecipes = recipes;
      
    }
    else if (search && type){
      filteredRecipes = recipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.country.name.toLowerCase().includes(search.toLowerCase())
          ||(filterByTypeFn(type)).includes(recipe.name)
        );
      });
    }
     else if(search)
     {
      filteredRecipes = recipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.country.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    else if(type){
      filteredRecipes = recipes.filter((recipe) => {
        return (
          (filterByTypeFn(type)).includes(recipe.name)
        );
      });
    }

  }
 
  setIsloading(false);
      setRecipes(filteredRecipes);
   
  }, [search,type,location, recipes.length]);


  const refresh =(e) =>{
    e.preventDefault();
    search ='';
    setType('')
    clearLocation()
    getRecipes();
  }

  const clearLocation = () => {
    navigate(location.pathname, { replace: true });
  }

  const filterByType = (e,value) =>{
e.preventDefault();
clearLocation()
setType(value);
    getRecipes();
  }

  return (
    <div>
      <FilterRecipeByType getAll={refresh} filterType={filterByType}></FilterRecipeByType>
      <div className="cardcontainer">
        {isloading ? (
          <Spinner animation="grow" variant="light"></Spinner>
        ) : (
          recipes.length === 0 ? 
          (<Container  className="bg-light border" >

            <h1 className="notfoundText">Not data to display currently</h1>
            <Button onClick={refresh}>Retry Loading All</Button>
          </Container>
            )
          :(
         <RecipeCard recipes={recipes}/>
        )
        )}
      </div>
    </div>
  );
};

export default RecipeViewCard;
