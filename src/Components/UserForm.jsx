import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <form id="cityForm" onSubmit={handleSend}>
        <h2>Add Recipe </h2>
        <div>
          <p>
            Hi <span className="wavehand">👋</span>. Welcome, start by adding a
            YUMMY! recipe
          </p>
        </div>
        <div className="inputdetails flexRow">
          <div className="valueinputside">
            <div className="userbox">
              <input
                type="text"
                name="name"
                onChange={formChange}
                placeholder="  eg. Fish Tako"
                required
              />
              <label>Recipe name:</label>
            </div>
          </div>
          <div className="valueinputside">
            <div className="userbox">
              <input
                type="text"
                name="author"
                placeholder="  eg. Jesse Mwangi"
                onChange={formChange}
                required
              />
              <label>Author Name:</label>
            </div>
          </div>
        </div>
        <div className="inputdetails flexRow">
          <div className="valueinputside">
            <select id="" onChange={selectchange}>
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
          </div>
        </div>
<hr />
      </form>
    </div>
  );
};

export default UserForm;