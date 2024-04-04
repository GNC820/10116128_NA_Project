import React, { useState, useEffect } from "react";
import Order from "./Order";
import { Table, Button, Col, Row } from "react-bootstrap";
import OrderModal from "./OrderModal";
import { addOrder, setDataOrder } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.order.orderList);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/orders`
      );
      dispatch(setDataOrder(response.data.sort((a, b) => b.id - a.id)));
      handleClose();
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddOrder = async (newOrder) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/orders/add`,
      newOrder
    );
    alert("Order submitted successfully!");
    addOrder(newOrder);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleOnUpdate = async (updatedOrder) => {
    const response = await axios.put( `${process.env.REACT_APP_SERVER_DOMAIN}/api/orders/${updatedOrder.id}`, updatedOrder);
    toast(response.data.message)
    fetchOrders();
    return response.data;
  }
  return (
    <div>
      <Row>
        <Col className="table-container"></Col>
        <Col xs="auto" s>
          {user.accountType === "Store" && (
            <Button variant="dark" onClick={handleShow} className="my-2">
              Add New Order
            </Button>
          )}
        </Col>
      </Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Design Ordered</th>
            <th>Colours</th>
            <th>Customer Name</th>
            <th>Shipping Label</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Payment</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <Order key={order.id} order={order} handleOnUpdate={handleOnUpdate}/>
          ))}
        </tbody>
      </Table>
      <OrderModal
        showModal={showModal}
        handleClose={handleClose}
        onSubmit={handleAddOrder}
        action={'Add'}
        order={null}
      />
    </div>
  );
};

export default Orders;
