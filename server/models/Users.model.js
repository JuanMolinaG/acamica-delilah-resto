const Sequelize = require('sequelize');
const dbConnection = require('../config/db-connection');

const Users = dbConnection.define('users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  register_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  role_id: {
    type: Sequelize.INTEGER,
    defaultValue: 2,
  },
});

module.exports = Users;
