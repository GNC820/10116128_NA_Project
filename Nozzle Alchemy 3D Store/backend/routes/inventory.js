const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getAllInventory);
router.post('/add', inventoryController.addInventory);
router.post('/edit', inventoryController.replaceInventory);

module.exports = router;