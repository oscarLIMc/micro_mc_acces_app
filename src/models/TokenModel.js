const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Token = sequelize.define('Token', {
  token: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Token;
