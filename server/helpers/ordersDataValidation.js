const Joi = require('@hapi/joi');

// Order validation
const orderValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().min(1).required(),
    description: Joi.string().min(1).max(255).required(),
    paymentMethodId: Joi.number().min(1).max(2).required(),
    products: Joi.array().items({
      productId: Joi.number().min(1).required(),
      productQuantity: Joi.number().min(1).required(),
    }),
  });

  return schema.validate(data);
};

module.exports = { orderValidation };
