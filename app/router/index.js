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
router.post('/event', eventController.createOneEvent);
router.get('/event/:idOrSlug', eventController.getOneEvent);
router.patch('/event/:id', eventController.updateOneEvent);
router.delete('/event/:id', eventController.deleteOneEvent);
router.patch('/event/:id/register', eventController.addParticipantToEvent);
router.patch('/event/:id/unregister', eventController.removeParticipantFromEvent);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.patch('/user/:id', userController.updateOneUser);
router.get('/user/:id/events', userController.getUserEvents);
router.get('/user/:id/teams', userController.getUserTeams);

// PREFERENCES
router.patch('/user/:id/preferences/platforms', preferencesController.updateUserPreferedPlatform);
router.patch('/user/:id/preferences/games', preferencesController.updateUserPreferedGame);

// AUTHENTIFICATION
router.post('/signup', authController.handleSignUp);
router.post('/login', authController.handleSignIn);

module.exports = router;