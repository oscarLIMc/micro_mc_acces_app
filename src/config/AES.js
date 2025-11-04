const crypto = require("crypto");
require('dotenv').config();

const AES_KEY_HEX = process.env.AES_KEY;
if (!AES_KEY_HEX || AES_KEY_HEX.length !== 64) {
  throw new Error("AES_KEY invalid or missing");
}

module.exports = Buffer.from(AES_KEY_HEX, "hex");