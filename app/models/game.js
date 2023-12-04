const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Game extends Model {}

Game.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'game'
});

module.exports = Game;