require('dotenv').config();
const fs = require("fs");
const path = require("path");

exports.downloadAPK = async (req, res) => {
  try {
    const fileName = "app-PR-release 1.apk";
    const filePath = path.resolve(process.env.APP_STORAGE, fileName);

    console.log("Resolved file path:", filePath);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ error: "APK not found" });

    return res.download(filePath, fileName);
  } catch (e) {
    return res.status(500).json({ error: "Download failed" });
  }
};

