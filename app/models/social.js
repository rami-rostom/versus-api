const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Social extends Model {}

Social.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'social'
});

module.exports = Social;