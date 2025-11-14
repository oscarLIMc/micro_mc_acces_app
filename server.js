const app = require("./src/app");
const sequelize = require("./src/config/sqlserver");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URL_BASE = process.env.URL_BASE || `http://localhost:${PORT}`;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`✅ Server running on ${URL_BASE}`),
      console.log(`✅ PORT: ${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error starting server:", e);
  }
})();