const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/reservation.controller');
const {
  createReservation, getAvailable
} = require('../../validations/reservation.validation');

const router = express.Router();

router.route('/')
  // .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.list)
  .post(validate(createReservation), controller.create);

router.route('/pending')
// .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.listPending);

router.route('/mark-released/:id')
// .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.markReleased);

router.route('/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.delete);


module.exports = router;
