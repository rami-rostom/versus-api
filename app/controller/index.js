const homeController = require('./home');
const eventController = require('./event');
const userController = require('./user');
const preferencesController = require('./preferences');
const authController = require('./auth');
const teamController = require('./team');
const searchController = require('./search');
const gameController = require('./game');
const typeEventController = require('./typeEvent');

module.exports = {
  homeController,
  eventController,
  userController,
  preferencesController,
  authController,
  teamController,
  searchController,
  gameController,
  typeEventController
};