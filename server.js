const app = require("./src/app");
const sequelize = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://10.55.37.2:${PORT}`)
    );
  } catch (e) {
    console.error("❌ Error starting server:", e);
  }
})();