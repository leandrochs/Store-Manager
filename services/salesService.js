const validateSalesMiddleware = require('../middlewares/validateSalesMiddleware');
const SalesModel = require('../models/salesModels');

const getAllSales = async () => {
  try {
    const sales = await SalesModel.getAllSales();
    return sales;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const sales = await SalesModel.getById(id);
    return sales;
  } catch (error) {
    console.log(error);
  }
};

const create = async (sales) => {
  try {
    const invalidParams = validateSalesMiddleware(sales);

    if (invalidParams) {
      return { error: invalidParams.error, message: invalidParams.message };
    }

    const created = await SalesModel.create(sales);

    return created;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const update = async (id, productId, quantity) => {
  try {
    const invalidParams = validateSalesMiddleware([{ productId, quantity }]);

    if (invalidParams) {
      return { error: invalidParams.error, message: invalidParams.message };
    }

    const exist = await SalesModel.getById(id);

    if (exist.length === 0) {
      return { error: 404, message: 'Sale not found' };
    }

    const product = await SalesModel.update(id, productId, quantity);

    return product;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

const deleteById = async (id) => {
  try {
    const exist = await SalesModel.getById(id);

    if (exist.length === 0) {
      return { error: 404, message: 'Sale not found' };
    }

    const sale = await SalesModel.deleteById(id);
    return sale;
  } catch (error) {
    console.log(error);
    return { error: 500, message: 'Erro no Servidor' };
  }
};

module.exports = {
  getAllSales,
  getById,
  create,
  update,
  deleteById,
};
