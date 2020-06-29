const Product = require('../models/Product.model');

const getProductBy = (field, value) => {
  return Product.findAll({
    where: {
      [field]: value,
    },
  })
    .then((product) => {
      return product[0];
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

module.exports = { getProductBy };
