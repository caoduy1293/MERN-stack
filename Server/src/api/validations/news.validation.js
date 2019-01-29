const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createNews: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      newsCategories: Joi.array(),
      typeObj: Joi.object(),
      imgs: Joi.array(),
      content: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      available: Joi.boolean(),
      is_promoted: Joi.boolean(),
    },
  },
};
