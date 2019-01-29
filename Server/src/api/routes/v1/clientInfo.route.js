const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/clientInfo.controller');
const {
  createClientInfo,
} = require('../../validations/clientInfo.validation');

const router = express.Router();

router.route('/')
  // .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.list)
  .post(authorize([ROLE_USER, ADMIN]), validate(createClientInfo), controller.create);
router.route('/:id')
  .get(controller.get);

module.exports = router;
