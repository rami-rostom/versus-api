const express = require('express');
const router = express.Router();

const { eventController } = require('../controller');

router.get('/event', eventController.getAllEvent);
router.get('/event/:id', eventController.getOneEvent);
router.post('/event', eventController.createOneEvent);
router.patch('/event/:id', eventController.updateOneEvent);
router.delete('/event/:id', eventController.deleteOneEvent);

module.exports = router;