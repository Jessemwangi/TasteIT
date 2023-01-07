import React, { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-uuid";

import { useParams } from "react-router-dom";
import { Col, Row, Container, Spinner, Button, Badge } from 'reactstrap';
import { SlPin } from "react-icons/sl";

import {addDoc, collection} from "@firebase/firestore";
import {db} from '../FireBaseInit';
import {useGet_one_recipe} from "../DataLayer/GetRecipe";

import Comments from "./Comments";
import RecipeComments from "../Components/RecipeComments";

import './Pages.css';
import Notification from "../Components/Notification";
import OneRecipeSteps from "../Views/OneRecipeSteps";
import OneRecipeIngridientsLists from "../Views/OneRecipeIngridientsLists";

const OneRecipeView = () => {

  const initData = {
    rating: "",
    sendBy: "",
    message: "",
  };

  const { id } = useParams();
  const {response} =useGet_one_recipe('recipe','id',id);
 
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
  const [response_, setResponse_] = useState(null);

  const handleCloseInfo = () => setShowInfo(false);


  useEffect(() => {
    setIsLoading(true);
    if (response !== null && response.length > 0){
      setIsLoading(false);
      setOneRecipeD(response[0])
    }
  }, [id, response]);

  const commetEntry = (e) => {

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  const post_Data = async (collectionName,data,idColName) => {  //idColName the id column name, ed Id, transactionID

       try {
           // const dataRef = doc(ref, data?.[idColName]);
           await addDoc(collection(db,collectionName), data)
           .then(docRef => {
             console.log("Document has been added successfully");
             setResponse_("Document has been added successfully")
         });
   
       } catch (error) {
        setResponse_(`An error occured ... ${error}`);
       }
       setIsLoading(false);
       return response_;
   }


  const AddCommentHandler = async (e) => {
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
        const result = await   post_Data('comments',newComment,'id')
        console.log(result);
        // axios
        //   .post("http://localhost:3001/comments", { ...newComment })
        //   .then((res) => {
        //     setBodyMessage(res.data);
        //     setIsLoading(false);
        //     setInfoTitle('Comment Posted');
        //     setShowInfo(true); setActionName('View Recipe');
        //     setInfoType('comments');
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
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

  const addToFeatured = async (e) => {
    let feature = e.target.value === "true" ? false : true
console.log(feature)
    try {
      const { data } = await axios.put(`http://localhost:3001/recipe/${oneRecipeD.id}`,
        { ...oneRecipeD, featured: feature});
      console.log(data);
      await  setOneRecipeD(response);
      setInfoTitle(`Recipe featured status changed to ${feature}`);
      setShowInfo(true);
      setActionName('Back to Recipe');
      setInfoType('');
      setBodyMessage(`Recipe name, ${data.name.toUpperCase()} by ${data.author.toUpperCase() }  
       Recipe featured status was updated`)
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
                    
                    <Button className="msgButton" variant="secondary" value={oneRecipeD.featured || false}  onClick={(e) =>addToFeatured (e)}>
                    {oneRecipeD.featured ? 'Remove To featured ' : 'Add To featured '}
                    <Badge
                      className="m-2  bg-light pinned"

                      children={<SlPin stroke="white" fill="red"
                        strokeWidth="0" style={{ color: "red", fontSize: "28px", cursor: "pointer" }} />

                      }
                    ></Badge></Button>
                   
                   
                

                        </p>
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

              <Button className="msgButton bg-danger"  onClick={handleShow}>
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
