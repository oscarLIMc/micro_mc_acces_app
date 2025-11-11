const sequelize = require('../config/db');
const Client = require('./ClientModel');
const User = require('./UserModel');
const Token = require('./TokenModel');

Client.hasMany(User, { foreignKey: 'clientId' });
User.belongsTo(Client, { foreignKey: 'clientId' });

User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, Client, User, Token };
