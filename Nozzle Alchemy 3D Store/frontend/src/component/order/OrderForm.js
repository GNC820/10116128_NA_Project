import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
const OrderForm = ({ onSubmit, handleClose, order }) => {
  const [newOrder, setNewOrder] = useState({ ...order });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newOrder);

    setNewOrder({
      designOrdered: "",
      colours: "",
      customerName: "",
      shippingLabel: "",
      status: "",
      notes: "",
      payment: "",
      paymentStatus: "",
    });
  };

  const designOrderedItems = [
    "Cloud headphones stand",
    "Cloud pen holder",
    "The Red Bluster Flexible Toy 20cm",
    "Mosasaurus Flexible Toy",
    "Humpback Whale 10cm",
    "Humpback Whale 13cm",
    "Humpback Whale 15cm",
    "Humpback Whale 20cm",
    "Avatar Tulkun Fidget Toy 19cm",
    "Trex",
    "Dinoaur Ring Holder-(without Tray)",
    "Daisy Headphone Stand",
    "Tulip Headphone Stand",
    "Large Frog",
    "Frog",
    "Sakura Headphone Stand",
  ];

  const colors = [
    "N/A",
    "Pink",
    "Black",
    "White",
    "Light Green",
    "Orange",
    "Red",
    "Blue",
    "Army Green",
    "Yellow",
    "Beige",
    "Gray",
    "Purple",
  ];

  const orderStatuses = [
    "Accepted",
    "Printing Started",
    "Ready For Packing",
    "Ready For Shipping",
    "Shipped",
    "On hold",
  ];

  const colorOptions = [
    { name: "Pink", color: "#FFC0CB" },
    { name: "Black", color: "#0e1111" },
    { name: "White", color: "#FFFFFF" },
    { name: "Light Green", color: "#90EE90" },
    { name: "Orange", color: "#FFA500" },
    { name: "Red", color: "#FF0000" },
    { name: "Blue", color: "#0000FF" },
    { name: "Army Green", color: "#4B5320" },
    { name: "Yellow", color: "#FFFF00" },
    { name: "Beige", color: "#F5F5DC" },
    { name: "Gray", color: "#808080" },
    { name: "Purple", color: "#800080" },
  ];

  const paymentStatuses = ["Paid", "Unpaid"];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="designOrdered" className="my-2">
        <Form.Select
          type="text"
          placeholder="Design Ordered"
          name="designOrdered"
          value={newOrder.designOrdered}
          onChange={handleInputChange}
        >
          <option value="">Select an item</option>
          {designOrderedItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="colours" className="my-2">
        <Form.Select
          type="text"
          placeholder="Colours"
          name="colours"
          value={newOrder.colours}
          style={{
            backgroundColor: colorOptions.find(
              (color, idx) => color.name === newOrder.colours
            )?.color,
          }}
          onChange={handleInputChange}
        >
          <option value="">Select a color</option>
          {colors.map((color, index) => (
            <option key={index} value={color} onChange={handleInputChange}>
              {color}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="customerName" className="my-2">
        <Form.Control
          type="text"
          placeholder="Customer Name"
          name="customerName"
          value={newOrder.customerName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="shippingLabel" className="my-2">
        <Form.Control
          type="text"
          placeholder="Shipping Label"
          name="shippingLabel"
          value={newOrder.shippingLabel}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="status" className="my-2">
        {/* <Form.Control  /> */}
        <Form.Select
          type="text"
          placeholder="Status"
          name="status"
          value={newOrder.status}
          onChange={handleInputChange}
        >
          <option value="">Select an order status</option>
          {orderStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="notes" className="my-2">
        <Form.Control
          type="text"
          placeholder="Notes"
          name="notes"
          value={newOrder.notes}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="payment" className="my-2">
        <Form.Control
          type="text"
          placeholder="Payment"
          name="payment"
          value={newOrder.payment}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="paymentStatus" className="my-2">
        {/* <Form.Control type="text" placeholder="Payment Status" name="paymentStatus" value={newOrder.paymentStatus} onChange={handleInputChange} /> */}
        <Form.Select
          type="text"
          placeholder="Payment Status"
          name="paymentStatus"
          value={newOrder.paymentStatus}
          onChange={handleInputChange}
        >
          <option value="">Select a payment status</option>
          {paymentStatuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="dark" type="submit" className="mx-2 my-2">
        Submit
      </Button>
      <Button variant="secondary" className="mx-2 my-2" onClick={handleClose}>
        Close
      </Button>
    </Form>
  );
};

export default OrderForm;
