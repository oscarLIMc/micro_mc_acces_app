const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mysql",
//     logging: false
//   }
// );

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