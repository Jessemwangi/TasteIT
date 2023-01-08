
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const HomeInfo = () => {
    return (
        <div>

            <Container className='bg-light m-2 p-2 rounded' fluid="fluid">
                <Row className='bg-light m-2 p-2'>
                    <Col className='bg-light m-2 border border-danger disrelative d-grid'>
                        <h2 className=' noReview recipeAuthor ml-0 bg-secondary rounded-top mb-3 p-4 disrelative' style={{ color: "snow", textAlign: "left" }}>
                            View Recipes</h2>

                        Access a wide a variety of recipes from all over the world, this recipes are posted by first class chef
                        like you who have interest in trying and sharing there secret to healthy and yummy meals out there.
                        <br />
                        <Link to={'/viewRecipes'} className="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">View Recipes</Link>
                    </Col>

                    <Col className='bg-light m-2 p-2 border border-danger d-grid'>
                        <h2 className='noReview recipeAuthor bg-secondary rounded-top mb-3 p-4' style={{ color: "snow", textAlign: "left" }}>
                            Why Add it
                        </h2>
                        Recipe are important to make food taste sweet and healthier, sharing your recipe will help someone somewhere
                        cook or increase coking experience, sharee you recipe and let the world find alternative of using same ingridients differently
                        and make cooking interesting
                        <Link to={'/addRecipe'} className="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">post Your Recipe</Link>
                    </Col>

                </Row>


            </Container>
        </div>
    );
};

export default HomeInfo;