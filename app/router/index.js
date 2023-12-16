const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const { homeController } = require('../controller');
const { eventController } = require('../controller');
const { userController } = require('../controller');
const { preferencesController } = require('../controller');
const { authController } = require('../controller');
const { teamController } = require('../controller');
const { searchController } = require('../controller');
const { gameController } = require('../controller');
const { typeEventController } = require('../controller');
const { platformController } = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// EVENT
router.get('/events', eventController.getAllEvent);
router.post('/event', verifyToken, eventController.createOneEvent);
router.get('/event/:idOrSlug', eventController.getOneEvent);
router.patch('/event/:id', verifyToken, eventController.updateOneEvent);
router.delete('/event/:id', verifyToken, eventController.deleteOneEvent);
router.patch('/event/:id/register', verifyToken, eventController.addParticipantToEvent);
router.patch('/event/:id/unregister', verifyToken, eventController.removeParticipantFromEvent);

// USER
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getOneUser);
router.patch('/user/:id', verifyToken, userController.updateOneUser);
router.get('/user/:id/events', userController.getUserEvents);
router.get('/user/:id/teams', userController.getUserTeams);
router.post('/user/:id/follow', verifyToken, userController.followUser);
router.post('/user/:id/unfollow', verifyToken, userController.unfollowUser);

// PREFERENCES
router.patch('/user/:id/preferences/platforms', verifyToken, preferencesController.updateUserPreferedPlatform);
router.patch('/user/:id/preferences/games', verifyToken, preferencesController.updateUserPreferedGame);
router.patch('/user/:id/preferences/events', verifyToken, preferencesController.updateUserPreferedEvent);

// TEAM
router.get('/teams', teamController.getAllTeams);
router.post('/team', verifyToken, teamController.createOneTeam);
router.get('/team/:id', teamController.getOneTeam);
router.patch('/team/:id', verifyToken, teamController.updateOneTeam);
router.delete('/team/:id', verifyToken, teamController.deleteOneTeam);
router.patch('/team/:id/user', verifyToken, teamController.updateTeamPlayers);

// AUTHENTIFICATION
router.post('/signup', authController.handleSignUp);
router.post('/login', authController.handleSignIn);

// SEARCH
router.get('/search/event', searchController.searchEvent);
router.get('/search/user', searchController.searchUser);
router.get('/search/team', searchController.searchTeam);
router.get('/search/all', searchController.searchAll);

// GAME
router.get('/games', gameController.getAllGames);

// TYPE EVENT
router.get('/types', typeEventController.getAllTypesEvent);

// PLATFORM
router.get('/platforms', platformController.getAllPlatforms);

module.exports = router;