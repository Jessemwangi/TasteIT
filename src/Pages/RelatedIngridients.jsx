import React from 'react';
import { Col, Row, Container } from 'reactstrap';

const RelatedIngridients = () => {
  return (

    <Container className="bg-light border" fluid="sm">
      <Row className="mt-2 p-3">
        <Col className="bg-light border p-2">
          <h2>Other Hot Ingredients in the same category</h2>
        </Col>
      </Row>
    </Container>

  );
};

export default RelatedIngridients;