const ProductsModel = require('../models/productsModel');

const getAllProducts = async () => {
  try {
    const products = await ProductsModel.getAllProducts();
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const products = await ProductsModel.getById(id);
    return products;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getById,
};
