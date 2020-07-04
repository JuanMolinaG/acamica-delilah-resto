const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: process.env.DBDIALECT,
    define: {
      timestamps: true,
      underscored: true,
    },
    dialectOptions: {
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    timezone: '-05:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
