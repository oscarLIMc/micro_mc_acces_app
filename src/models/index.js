const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
});

const Client = sequelize.define('Client', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  pass: { type: DataTypes.STRING, allowNull: false }
});

const Token = sequelize.define('Token', {
  token: { type: DataTypes.STRING, allowNull: false }
});

// Associations
Client.hasMany(User, { foreignKey: 'clientId' });
User.belongsTo(Client, { foreignKey: 'clientId' });

User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, Client, User, Token };
