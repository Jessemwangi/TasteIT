import React from 'react';
import { Col, Container, Row, Table } from 'reactstrap';

const OneRecipeSteps = ({ stepsArray }) => {

  return (

    <Container className="bg-light border p-3" fluid="fluid" >
      <Row className="bg-light">
        <Col>
          <h4 className="noReview recipeAuthor">Recipe steps</h4>
          {stepsArray.length > 0 ? (
            <Table striped hover responsive bordered>
              <thead><tr>
                <th>##</th>
                <th>Preparation Time</th>
                <th>Preparation Instructions</th>

              </tr></thead>
              <tbody>
                {stepsArray.map((step) => (
                  <tr key={step.stepid}>
                    <td>{step.stepid}</td>
                    <td>{step.timers}</td>
                    <td>{step.name}</td>
                  </tr>
                ))
                }
              </tbody>
            </Table>
          ) : (
            <h4 className='noReview'>OOOOPPS!!!, Seems like I can not find any Preparation Steps for this Recipe</h4>
          )}

        </Col>
      </Row>
    </Container>
  );
};

export default OneRecipeSteps;