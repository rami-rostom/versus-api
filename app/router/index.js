const express = require('express');
const router = express.Router();

const { eventController } = require('../controller');

router.get('/event', eventController.getAllEvent);
router.get('/event/:id', eventController.getOneEvent);

module.exports = router;