const jwt = require("jsonwebtoken");
const { Token, User } = require("../models");

// module.exports = async (req, res, next) => {
//   const auth = req.headers.authorization;
//   if (!auth || !auth.startsWith("Bearer "))
//     return res.status(401).json({ error: "Token missing" });

//   const tokenStr = auth.split(" ")[1];

//   try {
//     const payload = jwt.verify(tokenStr, process.env.JWT_SECRET, {
//       issuer: process.env.JWT_ISSUER,
//     });

//     const exists = await Token.findOne({ where: { token: tokenStr } });
//     if (!exists) return res.status(401).json({ error: "Token invalidated" });

//     req.user = payload;
//     next();
//   } catch (e) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };
// src/middleware/authJWT.js
// const jwt = require("jsonwebtoken");
// const { Token } = require("../models");

module.exports = async (req, res, next) => {

  // ✅ Antes venía en headers — ahora viene en el BODY
  const tokenStr = req.body.token;

  if (!tokenStr)
    return res.status(401).json({ error: "Token missing in body" });

  try {
    // ✅ Validar JWT
    const payload = jwt.verify(tokenStr, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });

    // ✅ Validar que existe en la base
    const exists = await Token.findOne({ where: { token: tokenStr } });
    if (!exists)
      return res.status(401).json({ error: "Token invalidated" });

    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

