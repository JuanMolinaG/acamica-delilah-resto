const User = require('../models/User.model');

const getUserBy = (field, value) => {
  return User.findAll({
    where: {
      [field]: value,
    },
  })
    .then((user) => {
      return user[0];
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

module.exports = { getUserBy };
