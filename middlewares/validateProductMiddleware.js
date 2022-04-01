const validateProductMiddleware = ({ name, quantity }) => {
  if (!name) return { error: 400, message: '"name" is required' };
  if (name.length < 5) {
    return {
      error: 422,
      message: '"name" length must be at least 5 characters long',
    }; 
}
  if (!quantity) return { error: 400, message: '"quantity" is required' };
  if (quantity <= 0) {
    return {
      error: 422,
      message: '"quantity" must be greater than or equal to 1',
    }; 
}
};

module.exports = validateProductMiddleware;
