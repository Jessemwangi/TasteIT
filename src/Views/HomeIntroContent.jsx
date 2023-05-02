import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { SiCodechef } from 'react-icons/si';

const HomeIntroContent = () => {
    return (
        <>
           
            <Container className='bg-light p-2 rounded-top' fluid="fluid" >
                <Row className='bg-light m-2 p-2 rounded-top infoRow' style={{alignItems: "flex-start",justifyContent: "space-evenly",}}>
                <Col className='bg-light m-2 p-2 border' sm={4} md={4} 
                style={{position:"relative",minHeight:"450px"}}>
                   
                <div className='p-3 border' style={{zIndex:"1000",position:"absolute", overflow:'hidden'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                </div>
                <div className='cheficon' style={{position:"absolute",color:"#b393937b", fontSize:"280px",textAlign:"center",width:"100%"}}>

<SiCodechef style={{verticalAlign: "text-top"}}></SiCodechef>
    </div>
                </Col>
                    <Col className='bg-light m-2 p-2 border' sm={7} md={7} >
                        <div>
                            <h2 className=' noReview recipeAuthor bg-secondary rounded-top mb-3 p-4' style={{ color: "snow" }}>
                                Add a Yummy Recipe Today
                            </h2>
                        <p>Whats a Recipe : The earliest known written recipes date to 1730 BC.
                           <br /> A recipe is a set of instructions that describes how to prepare or make something, especially a dish of 
                            prepared food. A sub-recipe or 
                            subrecipe is a recipe for an ingredient that will be called for in the instructions for the main recipe.
                            <br />Source <small><i> <a href="https://en.wikipedia.org/wiki/Recipe">
                                wikipedia</a></i></small></p>
                <Button className='bg-danger p-3 mt-4 mb-2'>Add and share your Recipe</Button>
                </div>
                </Col>

                </Row>


            </Container>
        </>
    );
};

export default HomeIntroContent;