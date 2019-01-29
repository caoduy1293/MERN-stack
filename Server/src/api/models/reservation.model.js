const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');
const moment = require('moment');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const RESERVATION_STATUS = require('../utils/reservationStatus');

const schemaCollection = new mongoose.Schema({
  startDate: {type: Date},
  endDate: {type: Date},
  roomId: {type: String},
  totalCost: {type: Number, default: 0},
  statusValue: {type: Number, default: 0},
  adminNote: {type: String, default: ''},
  customerNote: {type: String, default: ''},
  clientFirstName: {type: String},
  clientLastName: {type: String},
  clientPhone: {type: String},
  clientEmail: {type: String},
}, {
  timestamps: true,
});

schemaCollection.pre('save', async function save(next) {
  this.startDate = moment(this.startDate);
  this.endDate = moment(this.endDate);
  return next();
});

schemaCollection.statics = {
  list() {
    return this.find({})
      .sort({ createdAt: -1 })
      .exec();
  },
  listPending() {
    return this.find({statusValue: RESERVATION_STATUS.pending})
      .sort({ createdAt: -1})
      .exec();
  },
  async listByRoom(roomId) {
    return this.find({roomId: roomId})
      .sort({ createdAt: -1 })
      .exec();
  },
  async listByTimeRange(startDate, endDate) {
    return this.find({
      $and:[
        {startDate: {$lte: moment.utc(startDate).format()}},
        {endDate: {$gte: moment.utc(endDate).format()}},
        {statusValue: {$ne: RESERVATION_STATUS.released}}
        ]
    })
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
        message: 'Reservation does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = mongoose.model('reservation', schemaCollection);
