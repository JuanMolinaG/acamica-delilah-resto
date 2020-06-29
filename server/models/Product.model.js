const Sequelize = require('sequelize');
const dbConnection = require('../config/db-connection');

const Product = dbConnection.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
