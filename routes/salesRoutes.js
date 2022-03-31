const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/salesController');

router
  .get('/', SalesController.getAllSales)
  .get('/:id', SalesController.getById);

module.exports = router;
