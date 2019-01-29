const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    minlength: 2,
    required: true,
    trim: true,
  },
  description: {type: String},
  price: {type: Number, default: 0},
  imgs: {type: Array},
  services: {type: Array, default: []},
  available_quantity: {type: Number, default: 1},
  available: {type: Boolean},
  is_promoted: {type: Boolean},
}, {
  timestamps: true,
});

roomSchema.statics = {
  listAvailable() {
    return this.find({available: true})
      .sort({ createdAt: -1 })
      .exec();
  },
  list() {
    return this.find({})
      .sort({ createdAt: -1 })
      .exec();
  },
  async get(id) {
    try {
      let room;

      if (mongoose.Types.ObjectId.isValid(id)) {
        room = await this.findById(id).exec();
      }
      if (room) {
        return room;
      }

      throw new APIError({
        message: 'Room does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('room', roomSchema);
