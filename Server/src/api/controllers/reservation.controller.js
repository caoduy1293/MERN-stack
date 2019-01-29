const httpStatus = require('http-status');
const reservationModel = require('../models/reservation.model');
const roomModel = require('../models/room.model');
const APIError = require('../utils/APIError');
const RESERVATION_STATUSES = require('../utils/reservationStatus');

exports.create = async (req, res, next) => {
  try {
    const room = await roomModel.get(req.body.roomId);
    const reservationCreated = await (new reservationModel(req.body)).save();
    return res.json(reservationCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const reservations = await reservationModel.list();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

exports.listPending = async (req, res, next) => {
  try {
    const reservations = await reservationModel.list();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

exports.markReleased = async (req, res, next) => {
  try {
    //req.params.id
    const reservation = await reservationModel.get(req.params.id);
    reservation.statusValue = RESERVATION_STATUSES.released;
    reservation.save()
      .then(savedReservation => res.json(savedReservation));
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const reservations = await reservationModel.get(req.params.id);
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  reservationModel.findOneAndUpdate(
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
  const reservation = await reservationModel.get(req.params.id);
  const room = await roomModel.get(req.body.roomId);
  if(reservation.statusValue === RESERVATION_STATUSES.released && room.booked_quantity > 0) {
    room.booked_quantity = room.booked_quantity - 1;
    room.available = true;
    room.save()
      .catch(e => next(e));
  }
  reservation.save()
    .then(savedReservation => res.json(savedReservation))
    .catch(e => next(e));
};
