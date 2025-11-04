const { config } = require("dotenv")
module.exports = {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    expiresIn: "2m",
}