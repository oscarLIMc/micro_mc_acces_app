const { createUser } = require("../services/userService");
const { encryptAES } = require("../utils/aesUtils");

exports.create = async (req, res) => {
  try {
    console.log("creacion de usuario: ", req.body);
    const { username, password, clientId } = req.body;

    // se crea al usuario desde services donde existe el modelo del ORM CLiente
    const user = await createUser(username, password, clientId);
    if (!user) {
      console.log("No se pudo crear el usuario");
      return res.status(400).json(encryptAES({ error: "Missing fields" }));
    }

    console.log("Usuario creado con ID:", user.id)
    return res.status(201).json(encryptAES({
      id: user.id,
      username: user.username
    }));
  } catch (e) {
    return res.status(500).json(encryptAES({ error: "Failed to create user" }));
  }
};
