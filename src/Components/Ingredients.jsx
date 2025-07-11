import React from "react";
import { Table, Button, UncontrolledTooltip } from "reactstrap";
import AddIcon from '@mui/icons-material/Add';
import { Col, Row } from "react-bootstrap";

const Ingredients = ({
  categories,
  addIngridient,
  getIngridients,
  ingridients,
  removeIngridient,
  ingredientArray,
}) => {
  const ingridientsList = ingredientArray;

  return (
  <div className="p-4 bg-white rounded shadow-sm mb-4">
  <h4 className="mb-4">Add List of Ingredients</h4>

  {ingridientsList.length > 0 && (
    <Table striped hover responsive bordered>
      <thead className="table-dark">
        <tr>
          <th>Quantity</th>
          <th>Name</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {ingridientsList.map((ingridient) => (
          <tr key={ingridient.ingredientId}>
            <td>{ingridient.quantity}</td>
            <td>{ingridient.name}</td>
            <td>{ingridient.type}</td>
            <td>
              <Button
                size="sm"
                variant="danger"
                id={`rmvIngrid-${ingridient.ingredientId}`}
                onClick={(e) =>
                  removeIngridient(e, ingridient.ingredientId)
                }
              >
                Remove
              </Button>
              <UncontrolledTooltip
                placement="bottom"
                target={`rmvIngrid-${ingridient.ingredientId}`}
              >
                Click to remove entry
              </UncontrolledTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )}

  <Row className="g-3 align-items-end mt-3">
    <Col md={3}>
      <label className="form-label">Quantity</label>
      <input
        type="text"
        id="quantity"
        name="quantity"
        value={ingridients.quantity}
        onChange={getIngridients}
        required
        className="form-control"
        placeholder="5L"
      />
    </Col>

    <Col md={5}>
      <label className="form-label">Name</label>
      <textarea
        id="name"
        name="name"
        rows={2}
        value={ingridients.name}
        onChange={getIngridients}
        required
        className="form-control"
        placeholder="e.g. Pizza"
      ></textarea>
    </Col>

    <Col md={3}>
      <label className="form-label">Type</label>
      <select
        name="type"
        id="type"
        className="form-select"
        onChange={getIngridients}
      >
        <option value="">Select type</option>
        {categories.map((category) => (
          <option value={category.value} key={category.id}>
            {category.text}
          </option>
        ))}
      </select>
    </Col>

    <Col md={1}>
      <Button
        variant="danger"
        id="addIngrid"
        onClick={addIngridient}
        className="w-100"
      >
        <AddIcon />
      </Button>
      <UncontrolledTooltip placement="bottom" target="addIngrid">
        Click to add ingredient
      </UncontrolledTooltip>
    </Col>
  </Row>
</div>
  );
};

export default Ingredients;
