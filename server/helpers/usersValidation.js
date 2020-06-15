const Users = require('../models/Users.model');

const emailExist = (email) => {
  return Users.findAll({
    where: {
      email: email,
    },
  })
    .then((user) => {
      return user[0];
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

const usernameExist = (username) => {
  return Users.findAll({
    where: {
      username: username,
    },
  })
    .then((user) => {
      return user[0];
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

module.exports = { emailExist, usernameExist };
