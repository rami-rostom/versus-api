const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authMiddleware');
const tryCatch = require('../middlewares/tryCatchMiddleware');

const { 
  homeController, 
  eventController, 
  userController, 
  preferencesController, 
  authController, 
  teamController, 
  searchController, 
  gameController, 
  typeEventController, 
  platformController 
} = require('../controller');

// HOME
router.get('/', homeController.renderHomePage);

// EVENT
router.get('/events', tryCatch(eventController.getAllEvent));
router.get('/events/published', tryCatch(eventController.getAllPublishedEvent));
router.post('/event', verifyToken, tryCatch(eventController.createOneEvent));
router.get('/event/:idOrSlug', tryCatch(eventController.getOneEvent));
router.patch('/event/:id', verifyToken, tryCatch(eventController.updateOneEvent));
router.delete('/event/:id', verifyToken, tryCatch(eventController.deleteOneEvent));
router.patch('/event/:id/register', verifyToken, tryCatch(eventController.addParticipantToEvent));
router.patch('/event/:id/unregister', verifyToken, tryCatch(eventController.removeParticipantFromEvent));

// USER
router.get('/users', tryCatch(userController.getAllUsers));
router.get('/user/:idOrSlug', tryCatch(userController.getOneUser));
router.patch('/user/:id', verifyToken, tryCatch(userController.updateOneUser));
router.get('/user/:id/events', tryCatch(userController.getUserEvents));
router.get('/user/:id/teams', tryCatch(userController.getUserTeams));
router.get('/user/:id/games/events', tryCatch(userController.getEventsOfUserGames));
router.post('/user/:id/follow', verifyToken, tryCatch(userController.followUser));
router.post('/user/:id/unfollow', verifyToken, tryCatch(userController.unfollowUser));

// PREFERENCES
router.patch('/user/:id/preferences/platforms', verifyToken, tryCatch(preferencesController.updateUserPreferedPlatform));
router.patch('/user/:id/preferences/games', verifyToken, tryCatch(preferencesController.updateUserPreferedGame));
router.patch('/user/:id/preferences/events', verifyToken, tryCatch(preferencesController.updateUserPreferedEvent));

// TEAM
router.get('/teams', tryCatch(teamController.getAllTeams));
router.post('/team', verifyToken, tryCatch(teamController.createOneTeam));
router.get('/team/:id', tryCatch(teamController.getOneTeam));
router.patch('/team/:id', verifyToken, tryCatch(teamController.updateOneTeam));
router.delete('/team/:id', verifyToken, tryCatch(teamController.deleteOneTeam));
router.patch('/team/:id/user', verifyToken, tryCatch(teamController.updateTeamPlayers));

// AUTHENTIFICATION
router.post('/signup', tryCatch(authController.handleSignUp));
router.post('/login', tryCatch(authController.handleSignIn));
router.patch('/user/:id/edit/password', verifyToken, tryCatch(authController.handleNewPassword));

// SEARCH
router.get('/search/event', tryCatch(searchController.searchEvent));
router.get('/search/user', tryCatch(searchController.searchUser));
router.get('/search/team', tryCatch(searchController.searchTeam));
router.get('/search/all', tryCatch(searchController.searchAll));

// GAME
router.get('/games', tryCatch(gameController.getAllGames));

// TYPE EVENT
router.get('/types', tryCatch(typeEventController.getAllTypesEvent));

// PLATFORM
router.get('/platforms', tryCatch(platformController.getAllPlatforms));

module.exports = router;