const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  pass: { type: DataTypes.STRING, allowNull: false }
});

module.exports = User;
