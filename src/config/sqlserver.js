const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  'BODESA',
  'sa',
  'Enter83',
  {
    host: '10.55.37.12',
    port: 1433,
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