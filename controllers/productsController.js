const ProductsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductsService.getAllProducts();
    if (!products) return res.status(404).json({ message: 'Products not found' });
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
    if (!products) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAllProducts,
  getById,
};
