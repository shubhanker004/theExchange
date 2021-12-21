import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CartModal = ({ modal, handleClose, errorType }) => {
  return (
    <>
      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sorry :(</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorType === "auth" ? (
            <div><strong>You need to register or sign in to proceed!</strong></div>
          ) : (
            <div><strong>Your account is not verified. Pease verify your account first to proceed!</strong></div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {errorType === "auth" ? (
            <LinkContainer to="/sign_in">
              <Button variant="dark">Register / Sign In</Button>
            </LinkContainer>
          ) : (
            <Button variant="dark" onClick={() => alert("trigger")}>
              Send Verification Email
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CartModal;
