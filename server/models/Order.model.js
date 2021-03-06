const Sequelize = require('sequelize');
const dbConnection = require('../config/db-connection');

const Order = dbConnection.define('Orders', {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paymentMethodId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: [
      'Nuevo',
      'Confirmado',
      'Preparando',
      'Enviando',
      'Entregado',
      'Cancelado',
    ],
  },
});

module.exports = Order;
