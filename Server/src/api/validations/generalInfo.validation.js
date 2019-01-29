const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createGeneralInfo: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number(),
      imgs: Joi.string(),
      services: Joi.string(),
      quantity_allow: Joi.number(),
      available: Joi.boolean(),
      is_promoted: Joi.boolean()
    },
  },
};
