// src/components/OrderSuccessModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function OrderSuccessModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Placed</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your order has been placed successfully!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderSuccessModal;
