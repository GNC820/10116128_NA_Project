const express = require('express');
const userRoutes = require('./user');
const orderRoutes = require('./order');
const inventoryRoutes = require('./inventory');
const portofolioRoutes = require('./portofolio')
const financeRoutes = require('./finance')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/orders', orderRoutes)
router.use('/inventory', inventoryRoutes)
router.use('/portofolio', portofolioRoutes)
router.use('/finance', financeRoutes)

module.exports = router;