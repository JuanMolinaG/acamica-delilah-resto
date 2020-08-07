const Sequelize = require('sequelize');
const dbConnection = require('../config/db-connection');
const Order = require('./Order.model');
const Product = require('./Product.model');

const Order_Product = dbConnection.define(
  'order_product',
  {
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'order_product' }
);

Order_Product.belongsTo(Order);
Order.hasMany(Order_Product);
Order_Product.belongsTo(Product);
Product.hasMany(Order_Product);

module.exports = Order_Product;
