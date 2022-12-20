import React from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

const Notification = ({showInfo,handleCloseInfo,bodyMessage,
    infoTitle,notificationAct,ActionName,infoType}) => {
    return (
       
                    <Modal show={showInfo} onHide={handleCloseInfo}>
          <Modal.Header closeButton>
            <Modal.Title>{infoTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className="bg-light border p-3" fluid="fluid" >
            Hello <h2>{bodyMessage.sendBy || bodyMessage.author}</h2>

           {infoType ==='comments' ?  (<>
            <p>the following Data was posted successful</p>
            <hr />
            <p>{bodyMessage.message}</p>
            <p>Your Rating for the recipe was {bodyMessage.rating}</p>
            <p>transaction Time : {bodyMessage.date}</p>
            </>):(
                <>
                <p style={{ wordWrap: 'break-word'}}>{JSON.stringify(bodyMessage)}</p>
                </>
            )}
            <small>Thank you for taking you time and stop by</small>
            </Container>
            <Button onClick={handleCloseInfo}>Close me</Button>
            <Button onClick={notificationAct}>{ActionName}</Button>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>

     
    );
};

export default Notification;