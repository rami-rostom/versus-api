const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class TypeEvent extends Model {}

TypeEvent.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'type_event'
});

module.exports = TypeEvent;