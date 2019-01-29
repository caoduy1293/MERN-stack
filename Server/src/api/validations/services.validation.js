const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createService: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      imgs: Joi.array(),
      isGlobal: Joi.boolean(),
    },
  },
};
