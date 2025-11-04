const { registerClient } = require("../services/clientService");
const { encryptAES } = require("../utils/aesUtils");

exports.register = async (req, res) => {
  try {
    const { email } = req.decrypted;
    console.log("Create client:",email);
    const client = await registerClient(email);
    if (!client) return res.status(400).json(encryptAES({ error: "Email required" }));

    return res.status(201).json(encryptAES(client));
  } catch (e) {
    return res.status(500).json(encryptAES({ error: "Failed to create client" }));
  }
};
