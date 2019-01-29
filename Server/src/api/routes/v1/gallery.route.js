const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/gallery.controller');
const {
  createGallery,
} = require('../../validations/gallery.validation');

const router = express.Router();

router.route('/')
  // .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.list)
  .post(authorize([ROLE_USER, ADMIN]), validate(createGallery), controller.create);

router.route('/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
