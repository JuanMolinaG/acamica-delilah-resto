const router = require('express').Router();
const Order = require('../models/Order.model');
const Order_Product = require('../models/Order_Product.model');
const Product = require('../models/Product.model');
const {
  tokenIsValid,
  userIsAdmin,
} = require('../middlewares/users.middleware');
const { buildOrdersResponse } = require('../helpers/orders.operations');

router.get('/', tokenIsValid, userIsAdmin, (req, res) => {
  Order.findAll({
    attributes: [
      'status',
      'updatedAt',
      'id',
      'description',
      'paymentMethodId',
      'userId',
    ],
    include: [
      {
        model: Order_Product,
        attributes: ['productQuantity'],
        include: [
          {
            model: Product,
            attributes: ['id', 'name', 'price', 'imageUrl'],
          },
        ],
      },
    ],
  })
    .then(async (result) => {
      const ordersResponse = await buildOrdersResponse(result);
      res.send(ordersResponse);
    })
    .catch((error) => {
      console.log('error:', error);
    });
});

module.exports = router;
