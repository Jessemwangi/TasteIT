import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { signInAnonymously } from "firebase/auth";


import "./Views/CSS/Views.css";
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
import { auth } from "./FireBaseInit";
import { AuthContextProvider } from "./DataLayer/Context/Context";
import Profile from "./Pages/SignIn/Profile";
import SignIn from "./Pages/SignIn/SignIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/addRecipe" element={<AddRecipeForm />} />
      <Route path="/test" element={<PostToColle />} />
      <Route path="/viewRecipes" element={<RecipeViewCard />} />
      <Route path="/viewRecipe/:id" element={<OneRecipeView />} />
      <Route path="/help" element={<Help />} />
      <Route path="/comments" element={<Comments />} />
      <Route path="/userForm" element={<NotFound />} />
      <Route path="/profile" element={<Profile/>} />
       <Route path="/signIn" element={<SignIn/>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    document.title = "Taste It";

    // ✅ Sign in anonymously
    signInAnonymously(auth)
      .then(() => {
        // console.log("Signed in anonymously");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      {/* Wrap the RouterProvider with AuthContextProvider to provide auth context */}
      <AuthContextProvider>
      <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
