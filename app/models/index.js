const User = require('./user');
const Event = require('./event');
const Game = require('./game');
const Platform = require('./platform');
const Role = require('./role');
const Social = require('./social');
const Team = require('./team');
const TypeEvent = require('./type_event');


/*** SIMPLE ASSOCIATIONS ***/

// An user has one role
Role.hasMany(User, {
  as: 'users',
  foreignKey: 'role_id'
});
User.belongsTo(Role, {
  as: 'role',
  foreignKey: 'role_id' 
});

// A social belongs to an user
User.hasMany(Social, {
  as: 'socials',
  foreignKey: 'user_id'
});
Social.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

// An event has an event type
TypeEvent.hasMany(Event, {
  as: 'event_type',
  foreignKey: 'type_event_id'
});
Event.belongsTo(TypeEvent, {
  as: 'type_event',
  foreignKey: 'type_event_id'
});

// An event has a game
Game.hasMany(Event, {
  as: 'event_game',
  foreignKey: 'game_id'
});
Event.belongsTo(Game, {
  as: 'game',
  foreignKey: 'game_id'
});

// An event has a platform
Platform.hasMany(Event, {
  as: 'event_platform',
  foreignKey: 'platform_id'
});
Event.belongsTo(Platform, {
  as: 'platform',
  foreignKey: 'platform_id'
});

// An event has an organizer
User.hasMany(Event, {
  as: 'organize',
  foreignKey: 'user_id'
});
Event.belongsTo(User, {
  as: 'organizer',
  foreignKey: 'user_id'
});


/*** ADVANCED ASSOCIATIONS ***/

// An user can have several teams and a team can have several users
User.belongsToMany(Team, {
  as: 'teams',
  through: 'user_has_team',
  foreignKey: 'user_id',
  otherKey: 'team_id',
  updatedAt: false
});
Team.belongsToMany(User, {
  as: 'players',
  through: 'user_has_team',
  foreignKey: 'team_id',
  otherKey: 'user_id',
  updatedAt: false
});

// An user can follow several teams and a team can be followed by several users
User.belongsToMany(Team, {
  as: 'like_teams',
  through: 'user_like_team',
  foreignKey: 'user_id',
  otherKey: 'team_id',
  updatedAt: false
});
Team.belongsToMany(User, {
  as: 'users',
  through: 'user_like_team',
  foreignKey: 'team_id',
  otherKey: 'user_id',
  updatedAt: false
});

// An user can follow several users and an user can be followed by several users
User.belongsToMany(User, {
  as: 'followers',
  through: 'user_like_user',
  foreignKey: 'user_id',
  otherKey: 'user_liked_id',
  updatedAt: false
});
User.belongsToMany(User, {
  as: 'following',
  through: 'user_like_user',
  foreignKey: 'user_liked_id',
  otherKey: 'user_id',
  updatedAt: false
});

// An user can like several platforms and a platform can be liked by several users
User.belongsToMany(Platform, {
  as: 'platforms',
  through: 'user_like_platform',
  foreignKey: 'user_id',
  otherKey: 'platform_id',
  updatedAt: false
});
Platform.belongsToMany(User, {
  as: 'users',
  through: 'user_like_platform',
  foreignKey: 'platform_id',
  otherKey: 'user_id',
  updatedAt: false
});

// An user can like several games and a game can be liked by several users
User.belongsToMany(Game, {
  as: 'games',
  through: 'user_like_game',
  foreignKey: 'user_id',
  otherKey: 'game_id',
  updatedAt: false
});
Game.belongsToMany(User, {
  as: 'users',
  through: 'user_like_game',
  foreignKey: 'game_id',
  otherKey: 'user_id',
  updatedAt: false
});

// A game can belongs to several platforms and a platform can have several games
Game.belongsToMany(Platform, {
  as: 'platforms',
  through: 'game_has_platform',
  foreignKey: 'game_id',
  otherKey: 'platform_id',
  updatedAt: false
});
Platform.belongsToMany(Game, {
  as: 'games',
  through: 'game_has_platform',
  foreignKey: 'platform_id',
  otherKey: 'game_id',
  updatedAt: false
});

// An event can have several participants and an user can participate to several events
Event.belongsToMany(User, {
  as: 'participants',
  through: 'event_has_user',
  foreignKey: 'event_id',
  otherKey: 'user_id',
  updatedAt: false
});
User.belongsToMany(Event, {
  as: 'events',
  through: 'event_has_user',
  foreignKey: 'user_id',
  otherKey: 'event_id',
  updatedAt: false
});

// An event can have several teams and an team can participate to several events
Event.belongsToMany(Team, {
  as: 'teams',
  through: 'event_has_team',
  foreignKey: 'event_id',
  otherKey: 'team_id',
  updatedAt: false
});
Team.belongsToMany(Event, {
  as: 'events',
  through: 'event_has_team',
  foreignKey: 'team_id',
  otherKey: 'event_id',
  updatedAt: false
});

// An user can follow several events and an event can be followed by several users
User.belongsToMany(Event, {
  as: 'likeEvents',
  through: 'user_like_event',
  foreignKey: 'user_id',
  otherKey: 'event_id',
  updatedAt: false
});
Event.belongsToMany(User, {
  as: 'users',
  through: 'user_like_event',
  foreignKey: 'event_id',
  otherKey: 'user_id',
  updatedAt: false
});

module.exports = { User, Event, Game, Platform, Role, Social, Team, TypeEvent };