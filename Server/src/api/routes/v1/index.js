const error = require('../../middlewares/error');

const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');
const services = require('./services.route');
const reservation = require('./reservation.route');
const partner = require('./partner.route');
const newsCategory = require('./newsCategory.route');
const news = require('./news.route');
const generalInfo = require('./generalInfo.route');
const galleryCategory = require('./galleryCategory.route');
const gallery = require('./gallery.route');
const feedback = require('./feedback.route');
const clientInfo = require('./clientInfo.route');
const fileUpload = require('./fileUpload');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/services', services);
router.use('/reservation', reservation);
router.use('/partner', partner);
router.use('/news-category', newsCategory);
router.use('/news', news);
router.use('/general-info', generalInfo);
router.use('/gallery-category', galleryCategory);
router.use('/gallery', gallery);
router.use('/feedback', feedback);
router.use('/client-info', clientInfo);
router.use('/upload', fileUpload);

// if error is not an instanceOf APIError, convert it.
router.use(error.converter);

// catch 404 and forward to error handler
router.use(error.notFound);

// error handler, send stacktrace only during development
router.use(error.handler);

module.exports = router;
