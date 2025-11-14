const db = require("./src/config/sqlserver");

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Conectado correctamente a SQL Server");
    const usuario = "AALVIREZ";
    // const [results, metadata] = await db.query("SELECT CAT_LO_USUARIO FROM CAT_LOGINS");
    const [results, metadata] = await db.query(`SELECT CAT_LO_USUARIO, dbo.DECRYPTFMC(CAT_LO_CONTRASENA) PASS FROM CAT_LOGINS WHERE CAT_LO_USUARIO = '${usuario}'`);
// AALVIREZ	T3mp123*
    console.log("📌 Resultados:");
    console.log(results[0].PASS);
  } catch (error) {
    console.error("❌ Error al conectar a SQL Server:", error);
  }
})();
