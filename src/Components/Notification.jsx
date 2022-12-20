import React from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { UncontrolledTooltip } from 'reactstrap';

const Notification = ({ showInfo, handleCloseInfo, 
  bodyMessage, infoTitle, notificationAct, ActionName, infoType }) => {

  return (
    <Modal show={showInfo} onHide={handleCloseInfo}>
      <Modal.Header closeButton>
        <Modal.Title>{infoTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="bg-light border p-3" fluid="fluid" >
          Hi <span className="wavehand">👋</span> <h4>{bodyMessage.sendBy || bodyMessage.author || 'Recipe Fun'}</h4>

          {infoType === 'comments' ? (
          <>
            <p>the following Data was posted successful</p>
            <hr />
            <p>{bodyMessage.message}</p>
            <p>Your Rating for the recipe was {bodyMessage.rating}</p>
            <p>transaction Time : {bodyMessage.date}</p>
          </>
          ) 
          : 
          (
            <>
              <p style={{ wordWrap: 'break-word' }}>{JSON.stringify(bodyMessage)}</p>
            </>
          )
          }
          <small>Thank you for taking you time and stop by</small>
        </Container>
        <Button id='closeme' onClick={handleCloseInfo} className="bg-warning m-2 btn-outline-info btn-block">Close me</Button>
        <UncontrolledTooltip
                  placement="bottom"
                  target="closeme">
                  Close the current overlay view
                </UncontrolledTooltip>
        <Button onClick={notificationAct} className="m-2 btn-outline-info btn-block" >{ActionName}</Button>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>


  );
};

export default Notification;