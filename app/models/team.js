const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Team extends Model {}

Team.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'team'
});

module.exports = Team;