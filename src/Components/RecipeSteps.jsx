import React from "react";
import { Table, Button, UncontrolledTooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Col, Form, Row } from "react-bootstrap";

const RecipeSteps = ({ getSteps, steps, removeStep, addSteps, stepsArray }) => {

  return (
    <div className="p-4 bg-white rounded shadow-sm mb-4">
  <h4 className="mb-4 recipeAuthor">Add Preparation Steps</h4>

  {stepsArray.length > 0 && (
    <Table striped bordered hover responsive className="mb-4">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Time (min)</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {stepsArray.map((step) => (
          <tr key={step.stepid}>
            <td>{step.stepid}</td>
            <td>{step.timers}</td>
            <td>{step.name}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                id={`removeStep-${step.stepid}`}
                onClick={(e) => removeStep(e, step.stepid)}
              >
                &minus;
              </Button>
              <UncontrolledTooltip placement="bottom" target={`removeStep-${step.stepid}`}>
                This action will remove and distort steps
              </UncontrolledTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}

  <Form>
    <Row className="g-3 align-items-end">
      <Col md={3}>
        <Form.Label htmlFor="timer">Time (minutes)</Form.Label>
        <Form.Control
          type="number"
          id="timer"
          name="timers"
          placeholder="e.g. 5"
          required
          value={steps.timers}
          onChange={getSteps}
        />
      </Col>

      <Col md={8}>
        <Form.Label htmlFor="name">Step Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          id="name"
          name="name"
          placeholder="e.g. Boil water"
          required
          value={steps.name}
          onChange={getSteps}
        />
      </Col>

      <Col md={1} className="text-end">
        <Button
          variant="danger"
          size="lg"
          id="addStep"
          onClick={addSteps}
        >
          <AddIcon />
        </Button>
        <UncontrolledTooltip placement="bottom" target="addStep">
          Add the new step
        </UncontrolledTooltip>
      </Col>
    </Row>
  </Form>
</div>

  );
};

export default RecipeSteps;
