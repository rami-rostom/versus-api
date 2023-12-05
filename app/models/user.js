const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'user'
});

module.exports = User;