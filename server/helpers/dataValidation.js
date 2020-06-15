const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(60).required(),
    fullname: Joi.string().min(6).max(60).required(),
    email: Joi.string().min(6).max(60).required().email(),
    phone: Joi.string().min(7).max(20).required(),
    address: Joi.string().min(6).max(60).required(),
    password: Joi.string().min(6).max(60).required(),
  });

  return schema.validate(data);
};

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    username_email: Joi.string().min(6).max(60).required(),
    password: Joi.string().min(6).max(60).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
