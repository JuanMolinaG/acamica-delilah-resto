const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASENAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
