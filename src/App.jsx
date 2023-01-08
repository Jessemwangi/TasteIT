import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./Views/CSS/Views.css";
import {useEffect} from 'react';

import "./App.css";

import Home from "./Pages/Home";
import AddRecipeForm from "./Components/AddRecipeForm";
import RecipeViewCard from "./Views/RecipeViewCard";
import OneRecipeView from "./Pages/OneRecipeView";
import Help from "./Pages/Help";
import NotFound from "./Pages/NotFound";
import Comments from "./Pages/Comments";
import Layout from "./Pages/Layout";
import PostToColle from "./DataLayer/PostToColle";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/addRecipe" element={<AddRecipeForm />}>
        New Recipe
      </Route>
      <Route path="/test" element={<PostToColle/>}></Route>
      <Route path="/viewRecipes" element={<RecipeViewCard />}>
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
    </Route>
  )
);

function App() {
  useEffect(() => {
    document.title = 'Taste It';
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
