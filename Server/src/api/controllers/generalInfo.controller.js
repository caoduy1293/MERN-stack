const httpStatus = require('http-status');
const generalInfo = require('../models/generalInfo.model');

exports.create = async (req, res, next) => {
  try {
    const generalInfoCreated = await (new generalInfo(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(generalInfoCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const generalInfos = await generalInfo.list();
    res.json(generalInfos);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const generalInfo = await generalInfo.get(req.params.id);
    res.json(generalInfo);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  generalInfo.findOneAndUpdate(
    {_id: req.params.id}, // find a document with that filter
    req.body, // document to insert
    {upsert: true, new: true, runValidators: true}, // options
    function (err, updatedBike) { // callback
      if (err) next(err);
      else res.json(updatedBike)
    }
  );
};
