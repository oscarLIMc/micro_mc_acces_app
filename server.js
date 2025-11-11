const app = require("./src/app");
const sequelize = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URL_BASE = process.env.URL_BASE;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error starting server:", e);
  }
})();