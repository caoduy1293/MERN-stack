const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const schemaCollection = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    minlength: 6,
    required: true,
    trim: true,
  },
  emailAddress: {type: String},
  phoneNum: {type: String},
  address: {type: String},
}, {
  timestamps: true,
});

schemaCollection.statics = {
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
      if (user) {
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

module.exports = mongoose.model('client_info', schemaCollection);
