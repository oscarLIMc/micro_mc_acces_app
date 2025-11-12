const { Sequelize } = require("sequelize");
const { options } = require("../app");
const sequelize = new Sequelize(
  'micro_mc_db',
  'sa',
  '213241095',
  {
    host: 'localhost',
    port: 1434,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    },
  }
);

module.exports = sequelize;