const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createGallery: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      imgs: Joi.array(),
      galleryCategory: Joi.object(),
    },
  },
};
