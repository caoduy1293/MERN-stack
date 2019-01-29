const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/galleryCategory.controller');
const {
  createGalleryCategory,
} = require('../../validations/galleryCategory.validation');

const router = express.Router();

router.route('/')
  // .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .get(controller.list)
  .post(validate(createGalleryCategory), controller.create);
router.route('/:id')
  .get(controller.get)
  .delete(controller.delete)
  .put(controller.update);

module.exports = router;
