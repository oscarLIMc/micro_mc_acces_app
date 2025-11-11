const { decryptAES_GCM } = require("../utils/aesUtils");

module.exports = (req, res, next) => {
  try {
    console.log("🔐 Decrypting AES-GCM payload 🔐");
    const b = req.body;

    console.log("Payload received for decryption:", b);

    if (b && b.iv && b.data && b.tag) {
      req.decrypted = decryptAES_GCM(b.data, b.iv, b.tag);
    } else {
      req.decrypted = req.body;
    }
    next();
  } catch (e) {
    console.error("AES Decryption Error:", e.message);
    return res.status(400).json({ error: "Invalid AES payload" });
  }
};
