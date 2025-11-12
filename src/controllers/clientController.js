const { registerClient, getClientByEmail } = require("../services/clientService");
const { encryptAES } = require("../utils/aesUtils");
const { DataValidationError } = require("../utils/dataValidation");

exports.register = async (req, res) => {
  console.log("Request body:", req.body);
  const { email } = req.body;
  try {
    console.log("Create client:", email);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!DataValidationError.isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    var alredyExists = await getClientByEmail(email);
    if (alredyExists != null) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const client = await registerClient(email);
    if (!client) return res.status(400).json({ message: "Unable to register client" });

    return res.status(201).json({
      message: "Client registered successfully",
      clientId: client.id,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error no se ha podido crear al usuario" });
  }
};
