const Order = require('../models/Order.model');

const getOrderBy = (field, value) => {
  return Order.findAll({
    where: {
      [field]: value,
    },
  })
    .then((order) => {
      return order[0];
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

module.exports = { getOrderBy };
