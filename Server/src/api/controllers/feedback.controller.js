const httpStatus = require('http-status');
const feedbackModel = require('../models/feedback.model');

exports.create = async (req, res, next) => {
  try {
    const feedbackCreated = await (new feedbackModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(feedbackCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const feedbacks = await feedbackModel.list();
    res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const feedback = await feedbackModel.get(req.params.id);
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  feedbackModel.findOneAndUpdate(
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
    const feedback = await feedbackModel.get(req.params.id);
    await feedbackModel.find({ _id: req.params.id }).remove().exec();
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};
