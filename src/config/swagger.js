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
      url: `${URL_BASE}`,
      // url: `${URL_BASE}:${PORT}`,
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
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
