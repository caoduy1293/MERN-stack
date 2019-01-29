const httpStatus = require('http-status');
const roomModel = require('../models/room.model');
const reservationModel = require('../models/reservation.model');

exports.create = async (req, res, next) => {
  try {
    const roomCreated = await (new roomModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(roomCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const rooms = await roomModel.list();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const room = await roomModel.get(req.params.id);
    res.json(room);
  } catch (error) {
    next(error);
  }
};

exports.listAvailableRoom = async (req, res, next) => {
  try {
    const reservations = await reservationModel.listByTimeRange(req.query.startDate, req.query.endDate);
    let busyRoom = [];
    for(let i = 0, item; i < reservations.length; i++) {
      item = reservations[i];
      busyRoom.push(item.roomId);
    }
    const rooms = await roomModel.where( "_id" ).nin( busyRoom );
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  roomModel.findOneAndUpdate(
    {_id: req.params.id}, // find a document with that filter
    req.body, // document to insert
    {upsert: true, new: true, runValidators: true}, // options
    function (err, updatedBike) { // callback
      if (err) next(err);
      else res.json(updatedBike)
    }
  );
};

exports.delete = async (req, res, next) => {
  try {
    const room = await roomModel.get(req.params.id);
    await roomModel.find({ _id: req.params.id }).remove().exec();
    res.json(room);
  } catch (error) {
    next(error);
  }
};
