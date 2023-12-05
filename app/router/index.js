const express = require('express');
const router = express.Router();

const { homeController } = require('../controller');
const { eventController } = require('../controller');
const { userController } = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// EVENT
router.get('/events', eventController.getAllEvent);
router.get('/event/:id', eventController.getOneEvent);
router.post('/event', eventController.createOneEvent);
router.patch('/event/:id', eventController.updateOneEvent);
router.patch('/event/:id/register', eventController.addParticipantToEvent);
router.patch('/event/:id/unregister', eventController.removeParticipantFromEvent);
router.delete('/event/:id', eventController.deleteOneEvent);

// USER
router.get('/user/:id', userController.getOneUser);
router.patch('/user/:id', userController.updateOneUser);

module.exports = router;