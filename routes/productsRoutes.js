const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/productsController');

router
  .get('/', ProductsController.getAllProducts)
  .get('/:id', ProductsController.getById)
  .post('/', ProductsController.create)
  .put('/:id', ProductsController.update);

module.exports = router;