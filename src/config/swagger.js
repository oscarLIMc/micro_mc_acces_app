const swaggerJsdoc = require("swagger-jsdoc");
const PORT = process.env.PORT;
const URL_BASE = process.env.URL_BASE;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MCStore Microservice Bodesa access App",
    version: "2.0.0",
    description: "API documentation for MCStore Bodesa App (AES-GCM + JWT)",
  },
  servers: [
    {
      // url: `${URL_BASE}`,
      url: `${URL_BASE}:${PORT}`,
    },
  ],
  components: {
    schemas: {
      AESPayload: {
        type: "object",
        description: "",
        properties: {
          data: { type: "string", example: "<Base64 encrypted data>" },
          iv: { type: "string", example: "<Base64 IV (12 bytes)>" },
          tag: { type: "string", example: "<Base64 Tag>" },
          name: { type: "string", example: "username" }
        },
      },
      ItemInformacion: {
        type: "object",
        properties: {
          ID: { type: "string", example: "TEST-007" },
          CREDITO: { type: "string", example: "XYZ-987" },
          ID_GRUPO: { type: "string", example: "G-A2" },
          NOMBRE: { type: "string", example: "Maestro Tester" },
          ID_PRODUCTO: { type: "integer", example: 42 },
          PRODUCTO: { type: "string", example: "Servicio de Prueba" },
          LATITUD: { type: "string", example: "0.0" },
          LONGITUD: { type: "string", example: "0.0" },
          CP: { type: "string", example: "00000" },
          ESTADO: { type: "string", example: "TEST" },
          MUNICIPIO: { type: "string", example: "TEST MUNI" },
          COLONIA: { type: "string", example: "TEST COL" },
          Cartera: { type: "string", example: "Z" },
          MENUS: { type: "string", example: "dash,info,conf" },
          DATOS: { type: "string", example: "datostest" },
          DIRECCION: { type: "string", example: "Mi dirección de prueba" },
          TRABAJO: { type: "string", example: "Trabajo de prueba" },
          Telefonos: { type: "string", example: "5555555555" },
          Mensaje: { type: "string", example: "¡La conexión con el backend fue OK!" }
        }
      },
      Generic: {
        type: "object",
        properties: {
          Estatus: { type: "string", example: "OK" },
          Informacion: {
            type: "array",
            items: { $ref: "#/components/schemas/ItemInformacion" }
          }
        }
      }
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
