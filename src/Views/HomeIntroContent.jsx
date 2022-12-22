import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';

const HomeIntroContent = () => {
    return (
        <div>
            <h2>About</h2>
            <Container className='bg-light m-2 p-2 rounded' fluid="fluid">
                <Row className='bg-light m-2 p-2 rounded'>
                    <Col className='bg-light m-2 p-2 border' sm={7} md={7} >
                        <div>
                        <h2 className='noReview recipeAuthor'>Add a Yummy Recipe Today</h2>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                <Button className='bg-danger p-3 mt-4 mb-2'>Add and share your Recipe</Button>
                </div>
                </Col>
                <Col className='bg-light m-2 p-2 border' sm={4} md={4}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore officia repellendus nemo magnam corrupti qui illum dolores 
                error omnis quia obcaecati, debitis mollitia id ex perferendis, veniam, asperiores ab natus.
                </Col>
                </Row>


            </Container>
        </div>
    );
};

export default HomeIntroContent;