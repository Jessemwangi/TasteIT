import React, { useState, useEffect } from "react";
import { Badge, Container, Row, Col, Button, Spinner } from "reactstrap";
import { useGetData } from '../DataLayer/DataAccessLayer';


const FilterRecipeByType = ({ getAll,filterType }) => {
  const [categories, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const[recipe,setRecipe] =useState([]);
  const [erro,setErro] =useState();

  const { response, error, isLoading_ } = useGetData('recipe');
  useEffect(() => {


    if (isLoading_) {
      setIsloading(isLoading_);
      
     }
      if (error) {
        setIsloading(isLoading_);
        setErro('An error occurred:', error);
     }
      else if (response)
    {
      setIsloading(isLoading_);
      setRecipe(response);
    }
  },[error, isLoading_, response]);



  const ingridientCategory = async () => {
    setIsloading(true);
    if (localStorage.getItem('category') !== null){
      const  data = await JSON.parse(localStorage.getItem('category'));
      setCategory(data);
    }
    setIsloading(false);
    
  };
// console.log(localStorage.getItem('category'));
  useEffect(() => {
     ingridientCategory();
  }, []);

  useEffect(() => {
    const getIngridnients = async () => {
      setIsloading(false);
      let ingridientsData = [];
      let type = [];
      try {
        const  data  = await recipe;
        data.map((item) => ingridientsData.push(item.ingredients));
        ingridientsData.map((ingredient) =>
          ingredient.map((item) => type.push(item.type))
        );
        setIsloading(false);
      } catch (error) {
        setErro('An error occurred:', error);
      }
      setType(type);
    };

    getIngridnients();
  }, [recipe]);

  return (
    <main>
      <Container className="bg-light border" fluid="fluid">
        <Row className="mt-3 mb-3">
         
          <Col className="bg-light border p-2">
            {isloading ? (
              <Spinner animation="grow" variant="light"></Spinner>
            ) : (
              <>
                {categories.length >0 && categories.map((cat) => (
                  <Button color="primary" outline className="m-2" key={cat.id} onClick={(e)=>filterType(e,cat.value)}>
                    {cat.value}
                    <Badge
                      className="m-1"
                      color="primary"
                      children=
                       {
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
      {erro};
    </main>
  );
};

export default FilterRecipeByType;
