const ProductsService = require('../services/productsService');

const messageError = 'Erro no Servidor';

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductsService.getAllProducts();
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: messageError });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await ProductsService.getById(id);
    if (!products) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: messageError });
  }
};

const create = async (req, res) => {
  try {
    const product = await ProductsService.create(req.body);
    if (product.error) {
      return res.status(product.error).json({ message: product.message });
    }

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: messageError });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductsService.update(id, name, quantity);

    if (product.error) {
      return res.status(product.error).json({ message: product.message });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: messageError });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.deleteById(id);

    if (product.error) {
      return res.status(product.error).json({ message: product.message });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: messageError });
  }
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
  deleteById,
};
