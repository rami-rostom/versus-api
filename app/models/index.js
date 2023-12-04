const User = require('./user');
const Event = require('./event');
const Game = require('./game');
const Platform = require('./platform');
const Role = require('./role');
const Social = require('./social');
const Team = require('./team');
const TypeEvent = require('./type_event');


/*** ASSOCIATIONS SIMPLES ***/

// Un utilisateur possède un rôle
Role.hasMany(User, {
  as: 'users',
  foreignKey: 'role_id'
});
User.belongsTo(Role, {
  as: 'role',
  foreignKey: 'role_id' 
});

// Un social appartient à un utilisateur
User.hasMany(Social, {
  as: 'socials',
  foreignKey: 'user_id'
});
Social.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
});

// Un event a un type d'event
TypeEvent.hasMany(Event, {
  as: 'events',
  foreignKey: 'type_event_id'
});
Event.belongsTo(TypeEvent, {
  as: 'type_event',
  foreignKey: 'type_event_id'
});

// Un event est lié à un jeu
Game.hasMany(Event, {
  as: 'events',
  foreignKey: 'game_id'
});
Event.belongsTo(Game, {
  as: 'game',
  foreignKey: 'game_id'
});

// Un event a un organisateur
User.hasMany(Event, {
  as: 'events',
  foreignKey: 'user_id'
});
Event.belongsTo(User, {
  as: 'organizer',
  foreignKey: 'user_id'
});


/*** JOINTURES ***/

// Un utilisateur peut avoir plusieurs équipes et une équipe peut avoir plusieurs utilisateurs
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

// Un utilisateur peut suivre plusieurs équipes et une équipe peut être suivi par plusieurs utilisateurs
User.belongsToMany(Team, {
  as: 'teams',
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

// Un utilisateur peut suivre plusieurs autres utilisateurs et un utilisateur peut être suivi par plusieurs utilisateurs
User.belongsToMany(User, {
  as: 'users',
  through: 'user_like_user',
  foreignKey: 'user_id',
  otherKey: 'user_id',
  updatedAt: false
});
User.belongsToMany(User, {
  as: 'users',
  through: 'user_like_user',
  foreignKey: 'user_id',
  otherKey: 'user_id',
  updatedAt: false
});

// Un utilisateur peut préférer plusieurs plateformes et une plateforme peut être aimé par plusieurs utilisateurs
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

// Un utilisateur peut aimer plusieurs jeux et un jeu peut être aimé par plusieurs utilisateurs
User.belongsToMany(Game, {
  as: 'games',
  through: 'user_like_game',
  foreignKey: 'user_id',
  otherKey: 'game_id',
  updatedAt: false
});
Platform.belongsToMany(Game, {
  as: 'users',
  through: 'user_like_game',
  foreignKey: 'game_id',
  otherKey: 'user_id',
  updatedAt: false
});

// Un jeu peut avoir plusieurs plateformes et une plateforme peut avoir plusieurs jeux
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

// Un event peut avoir plusieurs utilisateurs et un utilisateur peut participer à plusieurs events
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

// Un event peut avoir plusieurs équipes et une équipe peut participer à plusieurs events
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

module.exports = { User, Event, Game, Platform, Role, Social, Team, TypeEvent };