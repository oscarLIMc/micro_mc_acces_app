const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
});

module.exports = Client;
