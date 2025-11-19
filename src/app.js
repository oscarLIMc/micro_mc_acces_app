const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");
const testsRoutes = require("./routes/testsRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/auth", authRoutes);
app.use("/app", appRoutes);
app.use("/test", testsRoutes);

// SWAGGER
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;