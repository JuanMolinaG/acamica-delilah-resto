const Joi = require('@hapi/joi');

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(60).required(),
    fullname: Joi.string().min(6).max(60).required(),
    email: Joi.string().min(6).max(60).required().email(),
    phone: Joi.string().min(7).max(20).required(),
    address: Joi.string().min(6).max(60).required(),
    password: Joi.string().min(5).max(60).required(),
  });

  return schema.validate(data);
};

// Login validation
const loginEmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginEmailValidation };
