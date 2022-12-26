import React, { useState, useEffect } from "react";
import { Badge, Container, Row, Col, Button, Spinner } from "reactstrap";
import axios from "axios";

const FilterRecipeByType = ({ getAll,filterType }) => {
  const [categories, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [isloading, setIsloading] = useState(true);

  const ingridientCategory = async () => {
    setIsloading(true);
    const { data } = await axios.get("http://localhost:3001/category");
    setCategory(data);
    setIsloading(false);
  };

  useEffect(() => {
    ingridientCategory();
  }, []);

  useEffect(() => {
    const getIngridnients = async () => {
      setIsloading(true);
      let ingridientsData = [];
      let type = [];
      try {
        const { data } = await axios.get("http://localhost:3001/recipe");
        data.map((item) => ingridientsData.push(item.ingredients));
        ingridientsData.map((ingredient) =>
          ingredient.map((item) => type.push(item.type))
        );
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
      setType(type);
    };

    getIngridnients();
  }, []);

  return (
    <main>
      <Container className="bg-light border" fluid="fluid">
        <Row className="mt-3 mb-3">
         
          <Col className="bg-light border p-2">
            {isloading ? (
              <Spinner animation="grow" variant="light"></Spinner>
            ) : (
              <>
                {categories.map((cat) => (
                  <Button color="primary" outline className="m-2" key={cat.id} onClick={(e)=>filterType(e,cat.value)}>
                    {cat.value}
                    
                    <Badge
                      className="m-1"
                      color="primary"
                      children={
                        type.filter((item) => item === cat.value).length
                      }
                    ></Badge>
                  </Button>
                ))}
                <Button className="m-2 bg-danger" onClick={getAll}>
                  Load All Recipe
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FilterRecipeByType;
