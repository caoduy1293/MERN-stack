const httpStatus = require('http-status');
const galleryModel = require('../models/gallery.model');

exports.create = async (req, res, next) => {
  try {
    const galleryCreated = await (new galleryModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(galleryCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const galleries = await galleryModel.list();
    res.json(galleries);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const gallery = await galleryModel.get(req.params.id);
    res.json(gallery);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  galleryModel.findOneAndUpdate(
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
    const gallery = await galleryModel.get(req.params.id);
    await galleryModel.find({ _id: req.params.id }).remove().exec();
    res.json(gallery);
  } catch (error) {
    next(error);
  }
};
