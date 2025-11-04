const { User } = require("../models");
const { login } = require("../services/authService");
const { encryptAES } = require("../utils/aesUtils");
const jwtConfig = require("../config/jwt");

exports.login = async (req, res) => {
  console.log("🔐 Login attempt 🔐\n");
  try {
    const { username, password } = req.decrypted;
    console.log("Username:", username);
    const result = await login(username, password);
    if (!result)
      return res.status(401).json(encryptAES({ error: "Invalid credentials" }));
    console.log("token: ", result.tokenStr);
    return res.json(
      encryptAES({
        token: result.tokenStr,
        expiresIn: jwtConfig.expiresIn,
      })
    );
  } catch (e) {
    return res.status(500).json(encryptAES({ error: "Login failed" }));
  }
};
