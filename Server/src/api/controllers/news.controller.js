const httpStatus = require('http-status');
const newsModel = require('../models/news.model');

exports.create = async (req, res, next) => {
  try {
    const newsCreated = await (new newsModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(newsCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const news = await newsModel.list();
    res.json(news);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const news = await newsModel.get(req.params.id);
    res.json(news);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  newsModel.findOneAndUpdate(
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
    const news = await newsModel.get(req.params.id);
    await newsModel.find({ _id: req.params.id }).remove().exec();
    res.json(news);
  } catch (error) {
    next(error);
  }
};
