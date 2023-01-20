import React from "react";
import { Table, Button, UncontrolledTooltip } from "reactstrap";

const Ingredients = ({ categories,
  addIngridient,
  getIngridients,
  ingridients,
  removeIngridient,
  ingredientArray,
}) => {
  const ingridientsList = ingredientArray;

  const style = {

    textarea: {
      maxWidth: "100% ",
      maxHeight: "100%",
      resize: "both",
      color:"black",
    }
  };


  return (
    <div className="col bg-light">
      <h4 className="col_Bottom noReview recipeAuthor">Add list of ingredients</h4>
      {ingridientsList.length > 0 ? (
      <Table striped hover responsive>
        <thead><tr>
          <th>Quantity</th>
          <th>Ingridient Name</th>
          <th>Type</th>
          <th>Action</th>
        </tr></thead>
        <tbody>
          {ingridientsList.map((ingridient) => (
            <tr key={ingridient.ingredientId}>
              <td>{ingridient.quantity}</td>
              <td>{ingridient.name}</td>
              <td>{ingridient.type}</td>
              <td><Button
                type="button"
                id="rmvIngrid"
                className="bg-danger"
                onClick={(e) => removeIngridient(e, ingridient.ingredientId)}>
                -
              </Button>    <UncontrolledTooltip placement="bottom"
                target="rmvIngrid" >Click to remove Entry</UncontrolledTooltip></td>
            </tr>
          ))
          }
        </tbody>
      </Table>) : (<></>)}

      <div className="ingredientContainer">

        <div className="userbox">
          <input 
            type="text"
            id="quantity"
            value={ingridients.quantity}
            name="quantity"
            required
            placeholder="5L"
            onChange={getIngridients}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>

        <div className="userbox">
          <textarea id="name" name="name" rows="5" cols="30"
            style={style.textarea}
            value={ingridients.name}
            required
            placeholder="eg. Pizza"
            onChange={getIngridients}>
          </textarea>

          <label htmlFor="name">Name:</label>
        </div>

        <div>

          <select name="type" id="type" onChange={getIngridients} >
            <option value="" defaultChecked>Select type</option>
            {categories.map(category => (
              <option value={category.value} key={category.id}>{category.text}</option>
            ))}
          </select>

        </div>

        <div className="MultipleEntryRight">
          <Button className="bg-danger lg" size="lg" id="addIngrid" onClick={addIngridient}>+</Button>
          <UncontrolledTooltip placement="bottom"
            target="addIngrid"  >Click to add filled ingredient</UncontrolledTooltip>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
