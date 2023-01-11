import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'reactstrap';
import FeaturedRecipe from '../Views/FeaturedRecipe';
import HomeCategory from '../Views/HomeCategory';
import HomeInfo from '../Views/HomeInfo';
import HomeIntroContent from '../Views/HomeIntroContent';

const Home = () => {
  const [isloading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState({});

  const getFeaturedRecipe = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3001/recipe/')
      setFeatured(data.filter(item => item.featured === true));

      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFeaturedRecipe()
  }, [])

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

                <HomeCategory />
              </Container>
            </Container>
          </>
        )
      }
    </main>
  );
};

export default Home;