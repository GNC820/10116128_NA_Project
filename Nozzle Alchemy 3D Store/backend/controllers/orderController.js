const Order = require("../models/order");

async function addOrder(req, res) {
  try {
    const {
      designOrdered,
      colours,
      customerName,
      shippingLabel,
      status,
      notes,
      payment,
      paymentStatus,
    } = req.body;

    const order = await Order.create({
      designOrdered,
      colours,
      customerName,
      shippingLabel,
      status,
      notes,
      payment,
      paymentStatus,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();

    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateOrder(req, res) {
  const orderId = req.params.orderId;
  const updatedData = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.update(updatedData);

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addOrder,
  getAllOrders,
  updateOrder,
};
