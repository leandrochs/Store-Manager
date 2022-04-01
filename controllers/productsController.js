const ProductsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductsService.getAllProducts();
    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
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
    return res.status(500).json({ message: 'Erro no Servidor' });
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
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await ProductsService.update(id, name, quantity);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.error) {
      return res.status(product.error).json({ message: product.message });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
};
