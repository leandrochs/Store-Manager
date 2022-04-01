const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return products[0];
};

const create = async ({ name, quantity }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?',
    [name],
  );
  return products[0];
};

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.products SET quantity = ? WHERE (id = ?);',
    [quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const deleteById = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE (id = ?);',
    [id],
  );

  return [{ idDeleted: id }];
};

module.exports = {
  getAllProducts,
  getById,
  create,
  getByName,
  update,
  deleteById,
};
