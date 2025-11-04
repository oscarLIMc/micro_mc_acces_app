const jwt = require("jsonwebtoken");
const { Token, User } = require("../models");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Token missing" });

  const tokenStr = auth.split(" ")[1];

  try {
    const payload = jwt.verify(tokenStr, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });

    const exists = await Token.findOne({ where: { token: tokenStr } });
    if (!exists) return res.status(401).json({ error: "Token invalidated" });

    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
