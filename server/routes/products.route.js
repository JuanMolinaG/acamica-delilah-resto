const router = require('express').Router();
const Product = require('../models/Product.model');
const {
  productIsValid,
  productExists,
} = require('../middlewares/products.middlewares');
const {
  tokenIsValid,
  userIsAdmin,
} = require('../middlewares/users.middleware');

router.post('/', tokenIsValid, userIsAdmin, productIsValid, (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
  };

  Product.create(product).then((savedProduct) => {
    res.send(savedProduct);
  });
});

router.get('/', tokenIsValid, (req, res) => {
  Product.findAll({})
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.log('error:', error);
    });
});

router.get('/:productId', tokenIsValid, productExists, (req, res) => {
  return res.send(req.product);
});

router.put(
  '/:productId',
  tokenIsValid,
  userIsAdmin,
  productExists,
  productIsValid,
  async (req, res) => {
    const productId = req.params.productId;
    const product = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    };
    Product.update(product, {
      where: {
        id: productId,
      },
    }).then(() => {
      res.json({ success: 'Product updated' });
    });
  }
);

router.delete(
  '/:productId',
  tokenIsValid,
  userIsAdmin,
  productExists,
  async (req, res) => {
    const productId = req.params.productId;
    Product.destroy({
      where: {
        id: productId,
      },
    }).then(() => {
      res.json({ success: 'Product deleted' });
    });
  }
);

module.exports = router;
