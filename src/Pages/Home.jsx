import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
// import HomeCategory from '../Views/HomeCategory';
import HomeInfo from '../Views/HomeInfo';
import HomeIntroContent from '../Views/HomeIntroContent';
import FeaturedRecipe from '../Views/FeaturedRecipe';
import { useGet_one_recipe } from '../DataLayer/GetRecipe';
// import HomeCatMui from '../Views/HomeCatMui';

const Home = () => {

  const [isloading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState({});
  const [recipeList, setRecipeList] = useState([])
  const [erro, setErro] = useState(null)

  // const { response, error, isLoading } = useGetData('recipe');
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
        console.log(error);
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
              <HomeInfo />
              <Container fluid="fluid" className='bg-light m-2 border rounded'>
                <h2 className='noReview recipeAuthor bg-light rounded-top mb-3 p-4' style={{ textAlign: "left" }}>
                  View more from each category</h2>

                {/* <HomeCategory /> */}
              </Container>
              {/* <HomeCatMui/> */}
            </Container>
          </>
        )
      }
      {erro}
    </main>
  );
};

export default Home;