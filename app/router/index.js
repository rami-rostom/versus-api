const express = require('express');
const router = express.Router();

const { homeController } = require('../controller');
const { eventController } = require('../controller');
const { userController } = require('../controller');
const { preferencesController } = require('../controller');
const { authController } = require('../controller');

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
router.get('/user/:id/events', userController.getUserEvents);
router.get('/user/:id/teams', userController.getUserTeams);

// PREFERENCES
router.patch('/user/:id/preferences/platforms', preferencesController.updateUserPreferedPlatform);
router.patch('/user/:id/preferences/games', preferencesController.updateUserPreferedGame);

// AUTHENTIFICATION
router.post('/signup', authController.handleSignUp);

module.exports = router;