
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

const HomeInfo = () => {
    return (
        <div>
            
            <Container className='bg-light m-2 p-2 rounded' fluid="fluid">
                <Row className='bg-light m-2 p-2'>
                    <Col className='bg-light m-2 border border-danger disrelative d-grid'>
                    <h2 className=' noReview recipeAuthor ml-0 bg-secondary rounded-top mb-3 p-4 disrelative' style={{color:"snow",textAlign:"left"}}>
                        View Recipes</h2>
                   
                    Access a wide a variety of recipes from all over the world, this recipes are posted by first class chef
                    like you who have interest in trying and sharing there secret to healthy and yummy meals out there. 
                <br />
                <Link to={'/viewRecipes'} className ="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">View Recipes</Link>
                </Col>
                <Col className='bg-light m-2 p-2 border border-danger d-grid'>
                <h2 className='noReview recipeAuthor bg-secondary rounded-top mb-3 p-4 ' style={{color:"snow" ,textAlign:"left"}}>
                    leave a Review</h2>
                Analyse recipes, see how different chef prepare meals, the nutrition  value it contains, each meal has the option to 
                leave a review. The review is in form of ratings and comment, read what others have commentted to.
                <Link to={'/'} className ="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">View Recipes</Link>
                </Col>
                <Col className='bg-light m-2 p-2 border border-danger d-grid'>
                <h2 className='noReview recipeAuthor bg-secondary rounded-top mb-3 p-4' style={{color:"snow" ,textAlign:"left"}}>
                    Why Add it
                    </h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                <Link to={'/addRecipe'} className ="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">post Your Recipe</Link>
                </Col>
                <Col className='bg-light m-2 p-2 border border-danger d-grid'>
                <h2 className='noReview recipeAuthor bg-secondary rounded-top mb-3 p-4' style={{color:"snow" ,textAlign:"left"}}>Multi Culture </h2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                <Link to={'/'} className ="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">View Recipes</Link>
                </Col>
                </Row>


            </Container>
        </div>
    );
};

export default HomeInfo;