const { decryptAES } = require("../utils/aesUtils");

module.exports = (req, res, next) => {
  try {
    const b = req.body;

    if (b && b.iv && b.data && b.tag) {
      req.decrypted = decryptAES(b.data, b.iv, b.tag);
    } else {
      req.decrypted = req.body;
    }
    next();
  } catch (e) {
    return res.status(400).json({ error: "Invalid AES payload" });
  }
};
