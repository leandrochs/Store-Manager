const salesService = require('../services/salesService');

const serverError = 'Erro no Servidor';

const getAllSales = async (req, res) => {
  try {
    const sales = await salesService.getAllSales();
    if (!sales) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: serverError });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesService.getById(id);
    if (sales.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: serverError });
  }
};

const create = async (req, res) => {
  try {
    const sale = await salesService.create(req.body);
    if (sale.error) {
      return res.status(sale.error).json({ message: sale.message });
    }

    return res.status(201).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: serverError });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body[0];
    const sale = await salesService.update(id, productId, quantity);

    if (sale.error) {
      return res.status(sale.error).json({ message: sale.message });
    }

    if (sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: serverError });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.deleteById(id);
    if (sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: serverError });
  }
};

module.exports = {
  getAllSales,
  getById,
  create,
  update,
  deleteById,
};
