const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Role extends Model {}

Role.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'role'
});

module.exports = Role;