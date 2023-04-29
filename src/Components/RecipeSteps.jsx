import React from "react";
import { Table, Button, UncontrolledTooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';

const RecipeSteps = ({ getSteps, steps, removeStep, addSteps, stepsArray }) => {
  const style = {
    textarea: {
      maxWidth: "100% ",
      maxHeight: "100%",
      resize: "height",
    },
  };

  return (
    <div className="col bg-light">
      <h4 className="col_Bottom noReview recipeAuthor">
        Add Preparation Steps
      </h4>
      {stepsArray.length > 0 ? (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>##</th>
              <th>Time</th>
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
                    className="bg-danger lg"
                    type="button"
                    id="removeStep"
                    onClick={(e) => removeStep(e, step.stepid)}
                  >
                    -
                  </Button>
                  <UncontrolledTooltip placement="bottom" target="removeStep">
                    this action will remove and distort steps
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <></>
      )}

      <div className="ingredientContainer">
        <div className="userbox">
          <input
            type="number"
            id="timer"
            value={steps.timers}
            name="timers"
            required
            placeholder="eg 5"
            onChange={getSteps}
          />
          <label htmlFor="quantity">Minutes</label>
        </div>
        <div className="userbox">
          <textarea
            id="name"
            rows="8"
            cols="60"
            style={style.textarea}
            name="name"
            value={steps.name}
            required
            placeholder="e.g boil water"
            onChange={getSteps}
          ></textarea>

          <label htmlFor="name">Description: </label>
        </div>

        <div className="saveBtnDiv">
          <Button
            className="bg-danger saveBtn"
            size="lg"
            onClick={addSteps}
            id="addStep"
          >
            <AddIcon/>
            
          </Button>
          <UncontrolledTooltip placement="bottom" target="addStep">
            Add the new step
          </UncontrolledTooltip>
        </div>
      </div>
    </div>
  );
};

export default RecipeSteps;
