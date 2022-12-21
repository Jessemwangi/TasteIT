import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'reactstrap';
import FeaturedRecipe from '../Views/FeaturedRecipe';
import HomeCategory from '../Views/HomeCategory';

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
        <h1>home</h1>
      </Container>
      {
        isloading ? (
          <>

            <h2>Featured Recipes</h2> <Spinner animation="grow" variant="light" ></Spinner>

          </>
        ) : (
          <>
            <Container className="bg-dark border rounded-top" fluid="fluid">
              <h1 style={{ color: "snow", padding: "0.5rem" }}>this week featured Recipes</h1>
              <FeaturedRecipe featuredRecipe={featured} />
            </Container>
            <HomeCategory/>
          </>
        )
      }
    </main>
  );
};

export default Home;