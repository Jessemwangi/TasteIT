import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import HomeIntroContent from '../Views/HomeIntroContent';
import FeaturedRecipe from '../Views/FeaturedRecipe';
import { useGet_one_recipe } from '../DataLayer/GetRecipe';


const Home = () => {

  const [isloading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState({});
  const [recipeList, setRecipeList] = useState([])
  const [erro, setErro] = useState(null)

  const { response, loading, error } = useGet_one_recipe('recipe', 'featured', true);
  useEffect(() => {


    if (loading) {
      setIsLoading(true);
    
    }
    if (error) {
      setIsLoading(false);
      setErro('An error occurred:', error)

    }
    else if (response) {
      setIsLoading(false);
      setRecipeList(response)
    }
  }, [error, isloading, loading, response])

  useEffect(() => {
    const getFeaturedRecipe = async () => {
      setIsLoading(true);
      try {
        setFeatured(recipeList.filter(item => item.featured === true));

        setIsLoading(false)
      } catch (error) {
        setErro(error);
      }
    }

    getFeaturedRecipe()
  }, [recipeList])

  return (
    <main>
      <Container className="bg-light border" fluid="fluid">
        <h1 className='noReview recipeAuthor' style={{ textAlign: "left" }}>Home</h1>
      </Container>
      {
        isloading ? (
          <>

            <h2>Featured Recipes</h2> <Spinner animation="grow" variant="light" ></Spinner>

          </>
        ) : (
          <>
            <Container className="bg-dark border rounded-top homeContainer" fluid="fluid">
              <h1 className='noReview recipeAuthor' style={{ color: "snow", padding: "1rem" }}>this week featured Recipes</h1>
              <FeaturedRecipe featuredRecipe={featured} />
              <HomeIntroContent />
            </Container>
          </>
        )
      }
      {erro}
    </main>
  );
};

export default Home;