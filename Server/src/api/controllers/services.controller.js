const httpStatus = require('http-status');
const servicesModel = require('../models/services.model');

exports.create = async (req, res, next) => {
  try {
    const serviceCreated = await (new servicesModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(serviceCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const services = await servicesModel.list();
    res.json(services);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const service = await servicesModel.get(req.params.id);
    res.json(service);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  servicesModel.findOneAndUpdate(
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
    const service = await servicesModel.get(req.params.id);
    await servicesModel.find({ _id: req.params.id }).remove().exec();
    res.json(service);
  } catch (error) {
    next(error);
  }
};
