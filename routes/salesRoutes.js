const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/salesController');

router
  .get('/', SalesController.getAllSales)
  .get('/:id', SalesController.getById)
  .post('/', SalesController.create);

module.exports = router;
