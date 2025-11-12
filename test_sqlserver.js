const db = require("./src/config/sqlserver");

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Conectado correctamente a SQL Server con autenticación Windows!");
  } catch (error) {
    console.error("❌ Error al conectar a SQL Server:", error);
  }
})();
