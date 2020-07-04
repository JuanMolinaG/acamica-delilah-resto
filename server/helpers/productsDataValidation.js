const Joi = require('@hapi/joi');

// Product validation
const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(60).required(),
    price: Joi.number().min(1).max(1000000).required(),
    imageUrl: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

module.exports = {
  productValidation,
};
