const httpStatus = require('http-status');
const partnerModel = require('../models/partner.model');

exports.create = async (req, res, next) => {
  try {
    const partnerCreated = await (new partnerModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(partnerCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const partners = await partnerModel.list();
    res.json(partners);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const partner = await partnerModel.get(req.params.id);
    res.json(partner);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  partnerModel.findOneAndUpdate(
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
    const partner = await partnerModel.get(req.params.id);
    await partnerModel.find({ _id: req.params.id }).remove().exec();
    res.json(partner);
  } catch (error) {
    next(error);
  }
};
