const Sequelize = require( 'sequelize' );
const dbConnection = require( '../config/db-connection' );

const User = dbConnection.define( 'user', {
    username: {
        type: Sequelize.STRING
    },
    fullname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    register_date: {
        type: Sequelize.DATE
    },
    role: {
        type: Sequelize.STRING
    }
});

module.exports = User;