import { Button } from "react-bootstrap";
import OrderModal from "./OrderModal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Order = ({ order, handleOnUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector((state) => state.user);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleOnSumbit = (updatedOrder) => {
    handleOnUpdate(updatedOrder);
    handleClose();
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.designOrdered}</td>
      <td>{order.colours}</td>
      <td>{order.customerName}</td>
      <td>{order.shippingLabel}</td>
      <td>{order.status}</td>
      <td>{order.notes}</td>
      <td>{order.payment}</td>
      <td>{order.paymentStatus}</td>
      <td>
        {(userData.accountType === "Admin" ||
          userData.accountType === "Manufacturer") && (
          <Button variant="info" onClick={handleShow}>
            Edit
          </Button>
        )}
      </td>
      <OrderModal
        showModal={showModal}
        handleClose={handleClose}
        onSubmit={handleOnSumbit}
        action={"Edit"}
        order={order}
      />
    </tr>
  );
};

export default Order;
