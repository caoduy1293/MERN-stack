const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const schemaCollection = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    minlength: 2,
    required: true,
    trim: true,
  },
  emailAddress: {type: String},
  phoneNum: {type: String},
  rating: {type: Number},
  note: {type: String},
  imgs: {type: Array},
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
      let item;

      if (mongoose.Types.ObjectId.isValid(id)) {
        item = await this.findById(id).exec();
      }
      if (item) {
        return item;
      }

      throw new APIError({
        message: 'feedback does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('feedback', schemaCollection);
