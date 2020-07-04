const { productValidation } = require('../helpers/productsDataValidation');
const { getProductBy } = require('../helpers/products.querys');

const productIsValid = (req, res, next) => {
  // Validate the data
  const { error } = productValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const productExists = async (req, res, next) => {
  const productId = req.params.productId;

  const productById = await getProductBy('id', productId);
  if (!productById) return res.status(400).json({ error: 'Product not found' });

  req.product = productById;

  next();
};

module.exports = { productIsValid, productExists };
