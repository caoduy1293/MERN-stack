const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createFeedback: {
    body: {
      name: Joi.string().required(),
      emailAddress: Joi.string(),
      phoneNum: Joi.string(),
      rating: Joi.number().allow('').optional(),
      note: Joi.string(),
      imgs: Joi.array(),
    },
  },
};
