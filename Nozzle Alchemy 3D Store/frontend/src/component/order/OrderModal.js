import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OrderForm from './OrderForm';

const OrderModal = ({ showModal, handleClose ,onSubmit, order, action }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <OrderForm onSubmit={onSubmit} handleClose={handleClose} order={order}/>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;