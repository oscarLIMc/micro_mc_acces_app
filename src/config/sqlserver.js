const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.MSSQL_NAME,
  process.env.MSSQL_USER,
  process.env.MSSQL_PASS,
  {
    host: process.env.MSSQL_HOST,
    port: process.env.MSSQL_PORT,
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