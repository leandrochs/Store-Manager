const validateSalesMiddleware = (sales) => {
  let invalidParams;

  sales.forEach((sale) => {
    if (!sale.productId) { invalidParams = { error: 400, message: '"productId" is required' }; }

    if (sale.quantity === undefined) { 
      invalidParams = { error: 400, message: '"quantity" is required' };
    }

    if (sale.quantity <= 0) {
      invalidParams = {
        error: 422,
        message: '"quantity" must be greater than or equal to 1',
      };
    }
  });

  return invalidParams;
};

module.exports = validateSalesMiddleware;
