const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createRoom: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number(),
      imgs: Joi.any(),
      services: Joi.array(),
      quantity_allow: Joi.number(),
      available: Joi.boolean(),
      is_promoted: Joi.boolean()
    },
  },
  getAvailable: {
    query: {
      startDate: Joi.date(),
      endDate: Joi.date()
    },
  }
};
