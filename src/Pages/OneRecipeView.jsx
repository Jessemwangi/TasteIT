import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";

import { useParams } from "react-router-dom";
import { Col, Row, Container, Spinner, Button } from 'reactstrap';

import RelatedIngridients from "./RelatedIngridients";
import Comments from "./Comments";
import RecipeComments from "../Components/RecipeComments";

import './Pages.css';
import Notification from "../Components/Notification";

const OneRecipeView = () => {

  const initData = {
    rating: "",
    sendBy: "",
    message: "",
  };
  
  const {id } = useParams();
  const [oneRecipeD, setOneRecipeD] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [inputs,setInputs] = useState(initData);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInfo, setShowInfo] = useState(false);
  const [bodyMessage,setBodyMessage] = useState(initData);
  const [infoTitle,setInfoTitle] = useState();
  const [ActionName,setActionName] =useState();
  const [infoType,setInfoType] =useState();

  const handleCloseInfo = () => setShowInfo(false);

  const oneRecipe = async (id) => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:3001/recipe/${id}`);
    setOneRecipeD(data);
   
    setIsLoading(false);
  };

  useEffect(() => {
    oneRecipe(id);
  }, [id]);

  const commetEntry = (e) =>{

    setInputs({
    ...inputs,
      [e.target.name]:e.target.value})
    }

    const AddCommentHandler = (e) =>{
      setIsLoading(true);
    e.preventDefault();
    if(inputs.rating && inputs.message && inputs.sendBy){

      const newComment ={
        ...inputs,
            id:uuid(),
            date: new Date(),
            recipeId:oneRecipeD.id
          };
      	  try {
      	axios
      	  .post("http://localhost:3001/comments", {...newComment})
      	  .then((res) => {
            setBodyMessage(res.data);
            setIsLoading(false);
            setInfoTitle('Comment Posted');
            setShowInfo(true); setActionName('View Recipe');
            setInfoType('comments');
      	  })
      	  .catch((err) => {
      	    console.log(err);
      	  });
      } catch (error) {
      	alert(`An error occured ${error}`)
      }
      setInputs(initData);
      handleClose();
    }
    else{
alert('All Parts of the comment need to be filled');
setIsLoading(false);
return false;
    }

    }

    const addToFeatured = async () =>{

     try {
	const {data} = await axios.put(`http://localhost:3001/recipe/${oneRecipeD.id}`,
	     {...oneRecipeD, featured:true });
       console.log(data);
       setInfoTitle('Recipe Added to Featured List');
       setShowInfo(true);
       setActionName('Back to Recipe');
            setInfoType('');
       setBodyMessage(`Recipe name, ${data.name.toUpperCase()} by ${data.author.toUpperCase()} was succefully added to this week featured recipe`)

} catch (error) {
	console.log(error);
}

    }
  return (
  <main>
   { isLoading ? (<Spinner animation="grow" variant="light" ></Spinner>)
    :
    (
      <div>
       
          <Container className="bg-light border" fluid="fluid">
            <Row className="mt-0 p-0">
              <Col className="bg-light p-2">
                <h2 className="recipeAuthor"><span>Recipe </span>
                  <img className="img_gif" src="https://acegif.com/wp-content/uploads/2022/fzk5d/taco-acegif-7-making-taco.gif"
                    alt="" /> {oneRecipeD.name}  </h2> 
                    <p><Button className="msgButton" variant="secondary" onClick={addToFeatured}>Add To featured</Button></p>
              </Col>
            </Row>
            <Row className="mt-0 p-0">
              <Col className="bg-light p-2">
                <h3 className="recipeAuthor"><span>By :</span> 👨‍🍳 {oneRecipeD.author} </h3>
              </Col>
            </Row>

            <Row className="mt-2 p-3">
              <Col>  <img
                src={`https://source.unsplash.com/500x300/?${oneRecipeD.name} `}
                alt={oneRecipeD.name}
                className="one_image"
              />
              </Col>
              <Col>
                <img
                  src={`https://source.unsplash.com/300x300/?${oneRecipeD.name} `}
                  alt={oneRecipeD.name}
                  className="one_image"
                />
              </Col>

            </Row>
            <Row className="bg-Secondary border">
              <Col xs={12} md={8} className="bg-Secondary border">
                <div className="rowDispaly">
                  <span className="recipeAuthor"> 🥘 <span> Ingridients : </span> {oneRecipeD.ingredients.length}</span>
                  <span className="recipeAuthor"> <span>Preparation Steps : </span> {oneRecipeD.steps.length}</span>

                  <span className="recipeAuthor">⏱️ <span>Minutes : </span>{oneRecipeD.steps.reduce((a, b) => a + parseInt(b.timers), 0)}</span>
                </div>
              </Col>
              <Col xs={6} md={4} className="bg-light border p-1">
                <div className="rowDispaly">
                  <span className="recipeAuthor"> <span> {oneRecipeD.country.name} : </span></span>
                  <img src={oneRecipeD.country.flagUrl} alt={oneRecipeD.country.name} className='SmFlag' />
                </div>

              </Col>

            </Row>


          </Container>
          
          <div>

            <Container className="bg-light border p-3" fluid="fluid" >
            <Row className="bg-light">
              <Col>
               <h1>Reviews</h1> 
              </Col>
              <hr />
            </Row>
              <RecipeComments handleClose={handleClose} 
              show={show} inputs={inputs}
              AddCommentHandler={AddCommentHandler} commetEntry ={commetEntry}/>
             
              <Notification showInfo={showInfo} notificationAct ={handleCloseInfo}
              handleCloseInfo = {handleCloseInfo} bodyMessage ={bodyMessage} 
              infoTitle = {infoTitle} ActionName = {ActionName} infoType ={infoType}/>

            <Button className="msgButton" variant="secondary" onClick={handleShow}>
          Add a Comment
        </Button>
        </Container>
        <Container className="bg-light border" fluid="fluid">
        <Comments RcpId={oneRecipeD.id}></Comments>
            </Container>
          </div>
        </div>)}
        </main>
  );
};

export default OneRecipeView;
