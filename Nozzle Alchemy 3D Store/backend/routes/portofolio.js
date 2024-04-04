const express = require('express');
const portofolioController = require('../controllers/portofolioController');

const router = express.Router();

router.get('/', portofolioController.getAllImages);
router.post('/add', portofolioController.addImage);
router.delete('/:id', portofolioController.deleteImage);
module.exports = router;