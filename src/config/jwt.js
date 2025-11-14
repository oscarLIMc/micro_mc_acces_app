require("dotenv").config()
module.exports = {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    expiresIn: "1m",
}

console.log("SECRET CARGADO:", process.env.JWT_SECRET);
