const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/add', orderController.addOrder);
router.put('/:orderId', orderController.updateOrder);
module.exports = router;