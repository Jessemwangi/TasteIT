import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";

const UserForm = ({ handleSend, formChange, handleCountrySelect }) => {
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://flagcdn.com/en/codes.json")
      .then((res) => {
        const items = Object.entries(res.data).map(([code, name]) => ({
          value: name,
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`https://flagcdn.com/24x18/${code}.png`}
                alt={name}
                style={{ width: "24px", height: "18px", marginRight: "8px" }}
              />
              {name}
            </div>
          ),
          flagUrl: `https://flagcdn.com/48x36/${code}.png`,
        }));
        items.sort((a, b) =>
          a.value.toLowerCase().localeCompare(b.value.toLowerCase())
        );
        setCountryOptions(items);
      })
      .catch(console.error);
  }, []);

  const handleCountryChange = (selectedOption) => {
    if (handleCountrySelect) {
handleCountrySelect({
      countryName: selectedOption.value,
      flagUrl: selectedOption.flagUrl,
    });
    }
  };

  return (
    <form id="cityForm" className="mb-4" onSubmit={handleSend}>
      <div className="p-4 bg-white rounded shadow-sm mb-3">
        <p className="h5">
          Hi <span className="wavehand">👋</span>. Welcome, start by adding a{" "}
          <strong>YUMMY!</strong> recipe
        </p>
      </div>

      <Row className="g-3">
        <Col md={6}>
          <label className="form-label">Recipe Name:</label>
          <input
            type="text"
            name="name"
            onChange={formChange}
            placeholder="e.g. Fish Tako"
            required
            className="form-control"
          />
        </Col>

        <Col md={6}>
          <label className="form-label">Author Name:</label>
          <input
            type="text"
            name="author"
            onChange={formChange}
            placeholder="e.g. Jesse Mwangi"
            required
            className="form-control"
          />
        </Col>

        <Col md={12}>
          <label className="form-label">Country:</label>
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select Country"
          />
        </Col>
      </Row>
      <hr />
    </form>
  );
};

export default UserForm;

