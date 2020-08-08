const router = require('express').Router();
const Order = require('../models/Order.model');
const Order_Product = require('../models/Order_Product.model');
const Product = require('../models/Product.model');
const {
  orderIsValid,
  orderExist,
  productsExists,
  statusIsValid,
} = require('../middlewares/orders.middlewares');
const {
  tokenIsValid,
  userIsAdmin,
  userIsAdminOrBuyer,
} = require('../middlewares/users.middleware');
const {
  buildOrdersResponse,
  buildSingleOrderResponse,
} = require('../helpers/orders.operations');

router.post('/', tokenIsValid, orderIsValid, productsExists, (req, res) => {
  const order = {
    userId: req.body.userId,
    description: req.body.description,
    paymentMethodId: req.body.paymentMethodId,
    status: 'Nuevo',
  };

  Order.create(order).then((savedOrder) => {
    req.body.products.forEach((product) => {
      const orderProduct = {
        orderId: savedOrder.id,
        productId: product.productId,
        productQuantity: product.productQuantity,
      };

      Order_Product.create(orderProduct);
    });
    res.send(savedOrder);
  });
});

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

router.get(
  '/:orderId',
  tokenIsValid,
  orderExist,
  userIsAdminOrBuyer,
  (req, res) => {
    const orderId = req.params.orderId;
    Order.findAll({
      attributes: ['status', 'id', 'paymentMethodId', 'userId'],
      where: {
        id: orderId,
      },
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
        const orderResponse = await buildSingleOrderResponse(result);
        res.send(orderResponse);
      })
      .catch((error) => {
        console.log('error:', error);
      });
  }
);

router.put(
  '/:orderId',
  tokenIsValid,
  userIsAdmin,
  orderExist,
  statusIsValid,
  (req, res) => {
    const orderId = req.params.orderId;
    const status = req.body.status;

    Order.update(
      { status: status },
      {
        where: {
          id: orderId,
        },
      }
    ).then(() => {
      res.json({ success: 'Order status updated' });
    });
  }
);

router.delete(
  '/:orderId',
  tokenIsValid,
  userIsAdmin,
  orderExist,
  async (req, res) => {
    const orderId = req.params.orderId;
    Order.destroy({
      where: {
        id: orderId,
      },
    }).then(() => {
      res.json({ success: 'Order deleted' });
    });
  }
);

module.exports = router;
