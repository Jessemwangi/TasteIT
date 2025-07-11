import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container } from "reactstrap";
import { Col, Row } from "react-bootstrap";

const UserForm = ({ handleSend, formChange, selectchange }) => {
  const [countryList, setCountryList] = useState([]);

  const Countries = async () => {
    const countryArray = [];
    const { data } = await axios.get("https://restcountries.com/v3.1/all/");
    data.forEach((item) => {
      countryArray.push({
        Name: item.name.common,
        Flag: item.flags.svg,
        flagicon: item.flag,
      });
    });
    setCountryList(countryArray);
  };

  useEffect(() => {
    Countries();
  }, []);

  return (
    <>
    <form id="cityForm" className="mb-4" onSubmit={handleSend}>
  <div className="p-4 bg-white rounded shadow-sm mb-3">
    <p className="h5">
      Hi <span className="wavehand">👋</span>. Welcome, start by adding a <strong>YUMMY!</strong> recipe
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
        id="author"
        name="author"
        placeholder="e.g. Jesse Mwangi"
        onChange={formChange}
        required
        className="form-control"
      />
    </Col>

    <Col md={12}>
      <label className="form-label">Country:</label>
      <select className="form-select" onChange={selectchange}>
        <option value="">Select Country</option>
        {countryList.map((country) => (
          <option
            key={country.Name}
            value={[country.Name.replace(",", " "), country.Flag]}
          >
            {country.Name} {country.flagicon}
          </option>
        ))}
      </select>
    </Col>
  </Row>
  <hr />
</form>
    </>
  );
};

export default UserForm;
