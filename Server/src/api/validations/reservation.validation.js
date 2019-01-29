const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createReservation: {
    body: {
      startDate: Joi.date(),
      endDate: Joi.date(),
      roomId: Joi.string(),
      totalCost: Joi.number().allow('').optional(),
      statusValue: Joi.number(),
      adminNote: Joi.string().allow('').optional(),
      customerNote: Joi.string().allow('').optional(),
      clientFirstName: Joi.string(),
      clientLastName: Joi.string(),
      clientPhone: Joi.string(),
      clientEmail: Joi.string(),
    },
  }
};
