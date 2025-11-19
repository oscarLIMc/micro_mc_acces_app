
async function testConnection(req, res) {
    console.log("✅ Test connection endpoint hit.");

    // --- Data de prueba que mapea a Generic.ItemInformacion ---
    const itemInformacion = {
        // NOTA: Los nombres de las claves (keys) DEBEN coincidir
        // con los valores de @SerializedName de tu clase Generic.kt

        "ID": "TEST-007",          // -> Mapea a LLAVE
        "CREDITO": "XYZ-987",      // -> Mapea a CONTRATO
        "ID_GRUPO": "G-A2",        // -> Mapea a ID_GRUPO
        "NOMBRE": "Maestro Tester",
        "ID_PRODUCTO": 42,
        "PRODUCTO": "Servicio de Prueba",
        "LATITUD": "0.0",
        "LONGITUD": "0.0",
        "CP": "00000",
        "ESTADO": "TEST",
        "MUNICIPIO": "TEST MUNI",
        "COLONIA": "TEST COL",
        "Cartera": "Z",            // -> Mapea a CARTERA
        "MENUS": "dash,info,conf",
        "DATOS": "datostest",
        "DIRECCION": "Mi dirección de prueba",
        "TRABAJO": "Trabajo de prueba",
        "Telefonos": "5555555555", // -> Mapea a TELEFONOS
        "Mensaje": "¡La conexión con el backend fue OK!" // Mensaje de éxito
    };

    // --- Respuesta Final que mapea a la clase Generic ---
    const responseGeneric = {
        // Clave 1: Estatus
        "Estatus": "OK",

        // Clave 2: Informacion (debe ser un array)
        "Informacion": [itemInformacion]
    };

    // El servidor debe responder con un código HTTP 200 (OK)
    return res.status(200).json(responseGeneric);
}
module.exports = { testConnection };