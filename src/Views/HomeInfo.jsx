
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import HomeCatMui from './HomeCatMui';

const HomeInfo = () => {
    return (
        <div>
            
            <Container className='bg-light p-2 rounded-bottom' fluid="fluid">
                <Row className='bg-light m-2 p-2 infoRow'>
                    <Col className='bg-light m-2 border border-danger disrelative d-grid'>
                    <h2 className=' noReview recipeAuthor ml-0 bg-secondary rounded-top mb-3 p-4 disrelative' style={{color:"snow",textAlign:"left"}}>
                        View Recipes</h2>
                   
                    Access a wide a variety of recipes from all over the world, this recipes are posted by first class chef
                    like you who have interest in trying and sharing there secret to healthy and yummy meals out there. 
                <br />
                <Link to={'/viewRecipes'} className ="btn btn-danger mt-3 mb-3 p-2 btn-lg" role="button">View Recipes</Link>
                </Col>
                <Col>
                <h4 className=' noReview recipeAuthor '>Categories</h4>
                <HomeCatMui/>
                </Col>

                </Row>


            </Container>
        </div>
    );
};

export default HomeInfo;