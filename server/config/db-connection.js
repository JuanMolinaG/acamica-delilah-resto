const { database, username, password, host, port, dialect } = require( './db-credentials' );
const Sequelize = require( 'sequelize' );

const sequelize = new Sequelize( database, username, password, {
    host: host,
    port: port,
    dialect: dialect,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;