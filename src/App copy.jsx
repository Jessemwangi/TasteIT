import { Routes, Route } from "react-router-dom";
import "./Views/CSS/Views.css";

import Home from "./Pages/Home";

import "./App.css";
import AddRecipeForm from "./Components/AddRecipeForm";
import RecipeViewCard from "./Views/RecipeViewCard";
import OneRecipeView from "./Pages/OneRecipeView";
import Help from "./Pages/Help";
import NotFound from "./Pages/NotFound";
import Comments from "./Pages/Comments";

function Appbck() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          Home
        </Route>
        <Route path="/addRecipe" element={<AddRecipeForm />}>
          New Recipe
        </Route>
        <Route path="/viewRecipes/:search" element={<RecipeViewCard />}>
          View Recipes
        </Route>
        <Route path="/viewRecipe/:id" element={<OneRecipeView />}>
          View Recipe
        </Route>
        <Route path="/help" element={<Help></Help>}>
          Help
        </Route>
        <Route path="/comments" element={<Comments />}>
          Comments
        </Route>
        <Route path="*" element={<NotFound />}>
          Not Found
        </Route>
        OneRecipeView
      </Routes>
    </div>
  );
}

export default Appbck;
