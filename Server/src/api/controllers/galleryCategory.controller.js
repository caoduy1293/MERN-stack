const httpStatus = require('http-status');
const galleryCategoryModel = require('../models/galleryCategory.model');

exports.create = async (req, res, next) => {
  try {
    const galleryCategoryCreated = await (new galleryCategoryModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(galleryCategoryCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const galleryCategories = await galleryCategoryModel.list();
    res.json(galleryCategories);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const galleryCategory = await galleryCategoryModel.get(req.params.id);
    res.json(galleryCategory);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  galleryCategoryModel.findOneAndUpdate(
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
    const galleryCate = await galleryCategoryModel.get(req.params.id);
    await galleryCategoryModel.find({ _id: req.params.id }).remove().exec();
    res.json(galleryCate);
  } catch (error) {
    next(error);
  }
};
