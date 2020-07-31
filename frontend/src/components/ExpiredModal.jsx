import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import ListGroup from "react-bootstrap/ListGroup";
const ExpriredModal = (props) => {
  let { isExpiredModalOpen, closeExpiredModal, aboutToExpire } = props;
  return (
    <div>
      <Modal show={isExpiredModalOpen} onHide={closeExpiredModal}>
        <ModalHeader closeButton>
          <ModalTitle>Tasks about to expire</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <ListGroup>
          {aboutToExpire.map((expire) => {
            return(
            <ListGroup.Item>{expire.taskName}</ListGroup.Item>
            )
          })}
        </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={closeExpiredModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ExpriredModal;
