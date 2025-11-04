const { createUser } = require("../services/userService");
const { encryptAES } = require("../utils/aesUtils");

exports.create = async (req, res) => {
  try {
    const { username, password, clientId } = req.decrypted;
    console.log(req.decrypted);
    

    const user = await createUser(username, password, clientId);
    if (!user)
      return res.status(400).json(encryptAES({ error: "Missing fields" }));

    return res.status(201).json(encryptAES({
      id: user.id,
      username: user.username
    }));
  } catch (e) {
    return res.status(500).json(encryptAES({ error: "Failed to create user" }));
  }
};
