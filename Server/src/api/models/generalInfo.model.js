const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const schemaCollection = new mongoose.Schema({
  phoneNum: {type: Number},
  emailAddress: {type: String},
  address: {type: Number},
  imgs: {type: Array},
  description: {type: String},
  slogan: {type: String},
  adminEmailAddress: {type: Boolean}
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

module.exports = mongoose.model('general_info', schemaCollection);
