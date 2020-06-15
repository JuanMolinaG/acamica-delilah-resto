const Users = require('../models/Users.model');

const getUserBy = (field, value) => {
  return Users.findAll({
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
