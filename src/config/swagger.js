const swaggerJsdoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "MCStore Microservice",
    version: "2.0.0",
    description: "API documentation for MCStore (AES-GCM + JWT)",
  },
  servers: [
    { url: `http://10.55.37.2:${PORT}` }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      AESPayload: {
        type: "object",
        description: "Encrypted AES-GCM payload from Android",
        properties: {
          data: { type: "string", example: "<Base64 encrypted data>" },
          iv: { type: "string", example: "<Base64 IV (12 bytes)>" },
          tag: { type: "string", example: "<Base64 Tag>" },
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
