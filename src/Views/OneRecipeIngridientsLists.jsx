import React from 'react';
import { Col, Container, Row, Table } from 'reactstrap';

const OneRecipeIngridientsLists = ({ ingridientsList }) => {
    return (
        <Container className="bg-light border p-3" fluid="fluid" >
            <Row className="bg-light">
                <Col>
                    <h4 className="noReview recipeAuthor">Recipe Ingridients </h4>
                    {
                        ingridientsList.length > 0 ?
                            (
                                <Table striped hover responsive className='table-light rounded border-success sm'>
                                    <thead>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Ingridient Name</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingridientsList.map((ingridient) => (
                                            <tr key={ingridient.ingredientId}>
                                                <td>{ingridient.quantity}</td>
                                                <td>{ingridient.name}</td>
                                                <td>{ingridient.type}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>

                            ) :
                            (
                                <h4 className='noReview'>OOOOPPS!!!, Seems like I can not find any Preparation Ingridients for this Recipe</h4>
                            )
                    }
                </Col>
            </Row>
        </Container>
    );

};

export default OneRecipeIngridientsLists;