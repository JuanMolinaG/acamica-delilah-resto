const {
  orderValidation,
  statusValidation,
} = require('../helpers/ordersDataValidation');
const { getProductBy } = require('../helpers/products.querys');
const { getOrderBy } = require('../helpers/orders.querys');

const orderIsValid = (req, res, next) => {
  // Validate the data
  const { error } = orderValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const orderExist = async (req, res, next) => {
  const orderId = req.params.orderId;

  const orderById = await getOrderBy('id', orderId);
  if (!orderById) return res.status(400).json({ error: 'Order not found' });

  next();
};

const productsExists = async (req, res, next) => {
  const products = req.body.products;
  const productsFound = async () => {
    return Promise.all(
      products.map(async (product) => {
        const productById = await getProductBy('id', product.productId);
        return productById ? true : false;
      })
    );
  };

  productsFound().then((results) => {
    const allProductsExist = results.every((result) => result);
    if (!allProductsExist)
      return res.status(400).json({
        error: 'The request can not be completed. One product does not exist',
      });

    next();
  });
};

const statusIsValid = (req, res, next) => {
  // Validate the data
  const { error } = statusValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = { orderIsValid, orderExist, productsExists, statusIsValid };
