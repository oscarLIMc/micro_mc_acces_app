const fs = require("fs");
const path = require("path");
require('dotenv').config();
console.log("Loaded env:", {
  AES_KEY: process.env.AES_KEY,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  APP_STORAGE: process.env.APP_STORAGE
});

exports.downloadAPK = async (req, res) => {
  try {
    const fileName = "app-debug.apk";
    const filePath = path.resolve(process.env.APP_STORAGE, fileName);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: "APK not found" });

    return res.download(filePath, fileName);
  } catch (e) {
    return res.status(500).json({ error: "Download failed" });
  }
};
