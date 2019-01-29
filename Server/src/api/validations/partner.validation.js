const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createPartner: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      imgs: Joi.optional(),
    },
  },
};
