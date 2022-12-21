import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";

import { useParams } from "react-router-dom";
import { Col, Row, Container, Spinner, Button, Badge } from 'reactstrap';

import RelatedIngridients from "./RelatedIngridients";
import Comments from "./Comments";
import RecipeComments from "../Components/RecipeComments";

import './Pages.css';
import Notification from "../Components/Notification";
import OneRecipeSteps from "../Views/OneRecipeSteps";
import OneRecipeIngridientsLists from "../Views/OneRecipeIngridientsLists";
import { SlPin } from "react-icons/sl";

const OneRecipeView = () => {

  const initData = {
    rating: "",
    sendBy: "",
    message: "",
  };

  const { id } = useParams();
  const [oneRecipeD, setOneRecipeD] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [inputs, setInputs] = useState(initData);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInfo, setShowInfo] = useState(false);
  const [bodyMessage, setBodyMessage] = useState(initData);
  const [infoTitle, setInfoTitle] = useState();
  const [ActionName, setActionName] = useState();
  const [infoType, setInfoType] = useState();

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

  const commetEntry = (e) => {

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const AddCommentHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (inputs.rating && inputs.message && inputs.sendBy) {

      const newComment = {
        ...inputs,
        id: uuid(),
        date: new Date(),
        recipeId: oneRecipeD.id
      };
      try {
        axios
          .post("http://localhost:3001/comments", { ...newComment })
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
    else {
      alert('All Parts of the comment need to be filled');
      setIsLoading(false);
      return false;
    }

  }

  const addToFeatured = async () => {

    try {
      const { data } = await axios.put(`http://localhost:3001/recipe/${oneRecipeD.id}`,
        { ...oneRecipeD, featured: true });
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
      {isLoading ? (<Spinner animation="grow" variant="light" ></Spinner>)
        :
        (
          <div>

            <Container className="bg-light border" fluid="fluid">
              <Row className="mt-0 p-0">
                <div className="p-2 banner_img">
                  <div className="oneRecipeintro">
                    <h2 className="recipeAuthor"><span>Recipe </span>
                      {/* <img className="img_gif" 
                    src="https://acegif.com/wp-content
                    /uploads/2022/fzk5d/taco-acegif-7-making-taco.gif"
                      alt="" /> */}
                      {oneRecipeD.name}  </h2>
                    <p>
                      <Button className="msgButton" variant="secondary" onClick={addToFeatured}>
                        Add To featured
                        <Badge
                          className="m-2  bg-light pinned"

                          children={<SlPin stroke="white" fill="red"
                            strokeWidth="0" style={{ color: "red", fontSize: "28px", cursor: "pointer" }} />

                          }
                        ></Badge></Button></p>
                  </div>
                </div>
              </Row>
              <Row className="mt-0 p-0">
                <Col className="bg-light p-2">
                  <h3 className="recipeAuthor"><span>By :</span> 👨‍🍳 {oneRecipeD.author} </h3>
                </Col>
              </Row>

              <div className="mt-2 p-3 oneRecipeMid">
                <div className="one__image">  
                <img
                  src={`https://source.unsplash.com/900x450/?${oneRecipeD.name} `}
                  alt={oneRecipeD.name}
                  
                />
                </div>
                <div  className="two__image">
                  <img className="img_abs"
                    src={`https://source.unsplash.com/450x400/?${oneRecipeD.name} `}
                    alt={oneRecipeD.name}/>

                    <div className="img_abs one_recip_prep">
                      <div className="border p-1"> <span className="recipeAuthor"> 🥘
                    <span> Ingridients : </span> {oneRecipeD.ingredients.length}</span></div>
                      <div className="border p-1"> <span className="recipeAuthor"><span>Preparation Steps : </span> {oneRecipeD.steps.length}</span></div>
                      <div className="border p-1">                  <span className="recipeAuthor">⏱️
                    <span>Minutes : </span>{oneRecipeD.steps.reduce((a, b) => a + parseInt(b.timers), 0)}</span>
                    </div>
                    <div className="border p-1">
                    <span className="recipeAuthor"> <span> {oneRecipeD.country.name} : </span></span>
                    <img src={oneRecipeD.country.flagUrl} alt={oneRecipeD.country.name} className='SmFlag' />
                  </div>
                    </div>
                </div>

              </div>


            </Container>

            <OneRecipeIngridientsLists ingridientsList={oneRecipeD.ingredients} />
            <OneRecipeSteps stepsArray={oneRecipeD.steps} />

            <Container className="bg-light border p-3" fluid="fluid" >
              <Row className="bg-light">
                <Col>
                  <h3 className="noReview recipeAuthor">Reviews</h3>
                </Col>
                <hr />
              </Row>
              <RecipeComments handleClose={handleClose}
                show={show} inputs={inputs}
                AddCommentHandler={AddCommentHandler} commetEntry={commetEntry} />

              <Notification showInfo={showInfo} notificationAct={handleCloseInfo}
                handleCloseInfo={handleCloseInfo} bodyMessage={bodyMessage}
                infoTitle={infoTitle} ActionName={ActionName} infoType={infoType} />

              <Button className="msgButton" variant="secondary" onClick={handleShow}>
                Add a Comment
              </Button>
            </Container>
            <Container className="bg-light border" fluid="fluid">
              <Comments RcpId={oneRecipeD.id}></Comments>
            </Container>

          </div>)}
    </main>
  );
};

export default OneRecipeView;
