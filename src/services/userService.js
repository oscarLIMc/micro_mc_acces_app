const bcrypt = require("bcrypt");
const { User } = require("../models");

async function createUser(username, password, clientId) {
  if (!username || !password || !clientId) return null;

  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ username, pass: hashed, clientId });
}

module.exports = { createUser };
