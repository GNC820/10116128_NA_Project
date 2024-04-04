const express = require('express');
const financeController = require('../controllers/financeController');

const router = express.Router();

router.get('/', financeController.getAllFinances);
router.post('/add', financeController.addFinanceRecord);

module.exports = router;