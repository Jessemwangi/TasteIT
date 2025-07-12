import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'reactstrap';
import HomeIntroContent from '../Views/HomeIntroContent';
import FeaturedRecipe from '../Views/FeaturedRecipe';
import { useGet_one_recipe } from '../DataLayer/GetRecipe';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [erro, setErro] = useState(null);
  
  // Get featured recipes
  const { response, loading, error } = useGet_one_recipe('recipe', 'featured', true);

  useEffect(() => {
    if (error) {
      setErro('An error occurred: ' + error);
      return;
    }
    
    if (response && response.length > 0) {
      // Filter featured recipes
      const featuredRecipes = response.filter(item => item.featured === true);
      setFeatured(featuredRecipes);
      setErro(null);
    }
  }, [response, error]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <main>
        <Container className="bg-light border" fluid="fluid">
          <h1 className='noReview recipeAuthor' style={{ textAlign: "left" }}>Home</h1>
        </Container>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Featured Recipes</h2>
          <Spinner animation="grow" variant="light" />
        </div>
      </main>
    );
  }

  // Show error if there's an error
  if (erro) {
    return (
      <main>
        <Container className="bg-light border" fluid="fluid">
          <h1 className='noReview recipeAuthor' style={{ textAlign: "left" }}>Home</h1>
        </Container>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Error: {erro}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Container className="bg-light border" fluid="fluid">
        <h1 className='noReview recipeAuthor' style={{ textAlign: "left" }}>Home</h1>
      </Container>
      
      <Container className="bg-dark border rounded-top homeContainer" fluid="fluid">
        <h1 className='noReview recipeAuthor' style={{ color: "snow", padding: "1rem" }}>
          This week featured Recipes
        </h1>
        <FeaturedRecipe featuredRecipe={featured} />
        <HomeIntroContent />
      </Container>
    </main>
  );
};

export default Home;