const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Token } = require("../models");

async function login(username, password) {
  const user = await User.findOne({ where: { username } });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.pass);
  if (!ok) return null;

  const payload = { id: user.id, username: user.username };
  const tokenStr = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: process.env.JWT_ISSUER,
  });

  await Token.create({ token: tokenStr, userId: user.id });

  return { tokenStr, user };
}

module.exports = { login };
