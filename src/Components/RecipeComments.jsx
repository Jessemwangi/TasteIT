import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const RecipeComments = ({show,handleClose ,AddCommentHandler,commetEntry,inputs}) => {
   
    const selectR = 6;
    let SelOption = []
    for (let i = 0; i < selectR; i++) {
        SelOption.push(<option value={i} key={i}>{i}</option>)
    }

    return (
         <form id='formEntry' onSubmit={AddCommentHandler} onChange={commetEntry}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Leave a Comment and Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Names</Form.Label>
                <Form.Control
                  type="text"
                  name='sendBy' value={inputs.sendBy}
                  onChange={commetEntry}
                  placeholder="Full Names"
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Ratings</Form.Label>
                <Form.Select onChange={commetEntry} name="rating"> 
                {SelOption}
        </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3" >
                <Form.Label>Comment Message</Form.Label>
                <Form.Control name='message' value={inputs.message}
                onChange={commetEntry} as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              cancel
            </Button>
            <Button variant="primary" onClick={AddCommentHandler}>
              send message
            </Button>
          </Modal.Footer>
        </Modal>
     </form>
    );
};

export default RecipeComments;
