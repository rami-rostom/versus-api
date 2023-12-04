const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Platform extends Model {}

Platform.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'platform'
});

module.exports = Platform;