import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import {SiCodechef} from 'react-icons/si';
import { Link } from 'react-router-dom';

const HomeIntroContent = () => {
    return (
        <>
           
            <Container className='bg-light p-2 rounded-top' fluid="fluid" >
                <Row className='bg-light m-2 p-2 rounded-top infoRow' style={{alignItems: "flex-start",justifyContent: "space-evenly",}}>
                <Col className='bg-light m-2 p-2 border' sm={4} md={4} 
                style={{position:"relative",minHeight:"450px"}}>
                   
                <div className='p-3 border' style={{zIndex:"1000",position:"absolute", overflow:'hidden'}}>
                "Cooking is one of the greatest joys I know, and sharing it makes it even more meaningful. These are the ingredients I use to bring this dish to life—each chosen with care to create something flavorful and comforting. Whether you're a seasoned cook or just starting out,
                 feel free to follow it as is or add your own twist. Great food is all about creativity and connection! yet flavorful. Whether you're a seasoned cook or just starting out, feel free to follow it as is or add your own twist. Great food is all about creativity and connection!.
                 A recipe is a set of instructions that describes how to prepare or make something, especially a dish of prepared food. A sub-recipe or subrecipe is a recipe for an ingredient that will be called for in the instructions for the main recipe.
                 "
                </div>
                <div className='cheficon' style={{position:"absolute",color:"#b393937b", fontSize:"280px",textAlign:"center",width:"100%"}}>

<SiCodechef style={{verticalAlign: "text-top"}}></SiCodechef>
    </div>
                </Col>
                    <Col className='bg-light m-2 p-2 border' sm={7} md={7} >
                        <div>
                        <h2 className=' noReview recipeAuthor bg-secondary rounded-top mb-3 p-4' style={{color:"snow"}}>
                            Add a Yummy Recipe Today
                            </h2>
                        <p>Whats a Recipe : The earliest known written recipes date to 1730 BC.
                           <br /> A recipe is a set of instructions that describes how to prepare or make something, especially a dish of 
                            prepared food. A sub-recipe or 
                            subrecipe is a recipe for an ingredient that will be called for in the instructions for the main recipe.
                            <br />Source <small><i> <a href="https://en.wikipedia.org/wiki/Recipe">
                                wikipedia</a></i></small></p>
                <Button className='bg-danger p-3 mt-4 mb-2'>
                    <Link to="/addRecipe" style={{color:"white", textDecoration:"none"}}>
                    Add and share your Recipe
                    </Link>
                    </Button>
                </div>
                </Col>

                </Row>


            </Container>
        </>
    );
};

export default HomeIntroContent;