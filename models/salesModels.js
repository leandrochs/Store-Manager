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

const create = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  let query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES';

  sales.forEach((sale) => {
    query += `( ${insertId}, ${sale.productId}, ${sale.quantity} ),`;
  });

  await connection.execute(query.substring(0, query.length - 1));

  return {
    id: insertId,
    itemsSold: sales,
  };
};

const update = async (id, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET quantity = ? WHERE (id = ?);',
    [quantity, id],
  );

  return {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };
};

module.exports = {
  getAllSales,
  getById,
  create,
  update,
};
