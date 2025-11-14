const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

  const tokenStr = req.body.token;

  if (!tokenStr)
    return res.status(401).json({ error: "Token missing in body" });

  try {
    // ✅ Validar JWT
    const payload = jwt.verify(tokenStr, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });

    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

