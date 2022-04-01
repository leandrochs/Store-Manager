const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/salesController');

router
  .get('/', SalesController.getAllSales)
  .get('/:id', SalesController.getById)
  .post('/', SalesController.create)
  .put('/:id', SalesController.update)
  .delete('/:id', SalesController.deleteById);

module.exports = router;
