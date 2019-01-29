const util = require('../../utils/Util');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    util.resolveUploadedPath(cb, req);
  },
  filename: function (req, file, cb) {
    util.resolveUploadedFileName(cb, file);
  }
});
const { authorize, ADMIN, ROLE_USER } = require('../../middlewares/auth');
const express = require('express');


const router = express.Router();

var upload = multer({ storage: storage });

router
  .route('/')
  .post(/**authorize([ROLE_USER, ADMIN]),  */upload.single('avatar'), handleUploadingImage)
;

router
  .route('/multi')
  .post(/**authorize([ROLE_USER, ADMIN]),  */upload.array('image', 5), handleUploadingImages)
;

function handleUploadingImage (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  if (!req.file) {
    res.json({status: 'FAILED', uploadedFileUrl: ''});
  } else {
    res.json({status: 'SUCCESS', uploadedFileUrl: util.getMulterUploadedFileUrl(req.file)});
  }
}

function handleUploadingImages (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  if (!req.files) {
    res.json({status: 'FAILED', uploadedFileUrls: []});
  } else {
    res.json({status: 'SUCCESS', uploadedFileUrls: util.getMulterUploadedFileUrls(req.files)});
  }
}

module.exports = router;
