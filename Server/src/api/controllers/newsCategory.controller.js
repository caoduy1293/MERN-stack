const httpStatus = require('http-status');
const newsCategoryModel = require('../models/newsCategory.model');

exports.create = async (req, res, next) => {
  try {
    const newsCategoryCreated = await (new newsCategoryModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(newsCategoryCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const newsCategories = await newsCategoryModel.list();
    res.json(newsCategories);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const newsCategory = await newsCategoryModel.get(req.params.id);
    res.json(newsCategory);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  newsCategoryModel.findOneAndUpdate(
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
    const newsCate = await newsCategoryModel.get(req.params.id);
    await newsCategoryModel.find({ _id: req.params.id }).remove().exec();
    res.json(newsCate);
  } catch (error) {
    next(error);
  }
};
