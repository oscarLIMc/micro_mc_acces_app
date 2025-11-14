const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const userRoutes = require("./routes/userRoutes");
const appRoutes = require("./routes/appRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();
app.use(express.json());
app.use(cors());

app.set('trust proxy', true);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} | proto=${req.protocol}`);
  next();
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/client", clientRoutes);
app.use("/user", userRoutes);
app.use("/app", appRoutes);

// SWAGGER
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
