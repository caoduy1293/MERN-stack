const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/generalInfo.controller');
const {
  createGeneralInfo,
} = require('../../validations/generalInfo.validation');

const router = express.Router();

router.route('/')
  // .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.list)
  .post(authorize([ROLE_USER, ADMIN]), validate(createGeneralInfo), controller.create);
router.route('/:id')
  .get(controller.get)
  .put(controller.update);

module.exports = router;
