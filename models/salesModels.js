const connection = require('./connection');

const getAllSales = async () => {
  const query = `
    SELECT 
      sp.sale_id AS saleId, 
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales_products sp
    INNER JOIN StoreManager.sales s ON sp.sale_id = s.id;`;

  const [result] = await connection.execute(query);

  return result;
};

const getById = async (id) => {
  const query = `
    SELECT  
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM 
      StoreManager.sales_products sp
    INNER JOIN
      StoreManager.sales s ON sp.sale_id = s.id
    WHERE sp.sale_id = ?;`;

  const [sales] = await connection.execute(query, [id]);

  return sales;
};

module.exports = {
  getAllSales,
  getById,
};
