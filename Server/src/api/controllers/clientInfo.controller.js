const httpStatus = require('http-status');
const clientInfo = require('../models/clientInfo.model');

exports.create = async (req, res, next) => {
  try {
    const clientInfoCreated = await (new clientInfo(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json(clientInfoCreated);
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const clientInfos = await clientInfo.list();
    res.json(clientInfos);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const clientInfo = await clientInfo.get(req.params.id);
    res.json(clientInfo);
  } catch (error) {
    next(error);
  }
};
exports.update = async (req, res, next) => {
  const clientInfo = await clientInfo.get(req.params.id);

  clientInfo.save()
    .then(savedClientInfo => res.json(savedClientInfo))
    .catch(e => next(e));
};
