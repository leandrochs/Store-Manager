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

module.exports = {
  getAllSales,
  getById,
};
