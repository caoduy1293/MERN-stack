const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createGalleryCategory: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      enable: Joi.boolean(),
    },
  },
};
