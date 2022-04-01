const validateProductMiddleware = require('../middlewares/validateProductMiddleware');
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

const create = async (product) => {
  try {
    const invalidParams = validateProductMiddleware(product);

    if (invalidParams) {
      return { error: invalidParams.error, message: invalidParams.message };
    }

    const exist = await ProductsModel.getByName(product.name);

    if (exist) {
      return { error: 409, message: 'Product already exists' };
    }

    const created = await ProductsModel.create(product);

    return created;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const update = async (id, name, quantity) => {
  try {
    const invalidParams = validateProductMiddleware({ name, quantity });

    if (invalidParams) {
      return { error: invalidParams.error, message: invalidParams.message };
    }

    const exist = await ProductsModel.getById(id);
    console.log('exist: ', exist);
    if (!exist) return exist;

    const product = await ProductsModel.update(id, name, quantity);
    return product;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const deleteById = async (id) => {
  try {
    const exist = await ProductsModel.getById(id);
    console.log('exist: ', exist);
    if (!exist) return exist;

    const product = await ProductsModel.deleteById(id);
    return product;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
  deleteById,
  
};
