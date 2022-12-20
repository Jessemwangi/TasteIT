import React from 'react';
import { Table, Button, UncontrolledTooltip } from 'reactstrap';

const RecipeSteps = ({ getSteps, steps, removeStep, addSteps, stepsArray }) => {
  const style = {
    input1: {
      width: "200px"
      , paddingLeft: "120px",
    },
    textarea: {
      maxWidth: "100% ",
      maxHeight: "100%",
      resize: "both",
      paddingLeft: "70px",
    }
  };

  return (
    <div className='col'>
      <h4 className="col_Bottom">Add Preparation Steps</h4>
      {stepsArray.length > 0 ? (<Table striped hover responsive>
        <thead><tr>
          <th>##</th>
          <th>Time</th>
          <th>Description</th>
          <th>Action</th>
        </tr></thead>
        <tbody>
          {stepsArray.map((step) => (
            <tr key={step.stepid}>
              <td>{step.stepid}</td>
              <td>{step.timers}</td>
              <td>{step.name}</td>
              <td>
                <Button
                  type="button"
                  id='removeStep'
                  onClick={(e) => removeStep(e, step.stepid)}>
                  -
                </Button>
                <UncontrolledTooltip
                  placement="bottom"
                  target="removeStep">
                  this action will remove and distort steps
                </UncontrolledTooltip>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>) : (<></>)}

      <div className="ingredientContainer">

        <div className="userbox">
          <input
            type="number" id="timer"
            value={steps.timers}
            name="timers" required
            onChange={getSteps} style={style.input1} />
          <label htmlFor="quantity">Timer</label>
        </div>
        <div className="userbox">

          <textarea id="name" rows="2" cols="60"
            style={style.textarea}
            name="name"
            value={steps.name}
            required
            onChange={getSteps}>
          </textarea>

          <label htmlFor="name">Description: </label>
        </div>

        <div className="MultipleEntryRight">
          <Button size="lg" onClick={addSteps} id='addStep' >+</Button>
          <UncontrolledTooltip placement="bottom"
            target="addStep"  >Add the new step</UncontrolledTooltip>
        </div>
      </div>
    </div>
  );
};

export default RecipeSteps;