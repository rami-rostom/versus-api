const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Event extends Model {}

Event.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title_slug: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  banner: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rules: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'event'
});

module.exports = Event;