import React, { useEffect, useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";

import { collection, getDocs,
} from "@firebase/firestore";
import { Button, Spinner } from "reactstrap";
import { db } from '../FireBaseInit';

import FilterRecipeByType from "../Components/FilterRecipeByType";
import { Container } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import { useGetData } from "../DataLayer/DataAccessLayer";

const RecipeViewCard = () => {
  const [, setResponse] = useState(null);
  const [erro, setErro] = useState(null);
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
    try {
      const coll_Name = collection(db, 'recipe');
      const colle_Snapshot = await getDocs(coll_Name);
      const colleList = colle_Snapshot.docs.map(doc => doc.data());

      setResponse(colleList);
      setRecipes(colleList);
      setIsloading(false);
  } catch (err) {
    setResponse(err);

  }
}

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
          recipe.country.name.toLowerCase().includes(search.toLowerCase()) ||
          (filterByTypeFn(search)).includes(recipe.name)
          
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
  const { response, error, isLoading_ } = useGetData('recipe')
  useEffect(() => {
    if (isLoading_) {
      setIsloading(isLoading_);
    }
    if (error) {
      setIsloading(isLoading_);
      setErro('An error occurred:', error);
    } else if (response) {
      setIsloading(isLoading_);
      setRecipes(response);
    }
  }, [error, isLoading_, response]);


  if (erro) {
    return (
      <Container className="bg-light border">
        <h1 className="notfoundText">An error occurred: {erro}</h1>
        <Button onClick={refresh}>Retry Loading All</Button>
      </Container>
    );
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
