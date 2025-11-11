require('dotenv').config();
console.log("Loaded env:", {
  AES_KEY: process.env.AES_KEY,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  APP_STORAGE: process.env.APP_STORAGE
});
const fs = require("fs");
const path = require("path");

exports.downloadAPK = (req, res) => {
  try {
    const fileName = "app-debug.apk";
    const filePath = path.resolve(process.env.APP_STORAGE, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "APK not found" });
    }

    const boundary = "----APKBoundary987654321";

    res.setHeader("Content-Type", `multipart/form-data; boundary=${boundary}`);
    res.setHeader("Cache-Control", "no-cache");

    const fileStream = fs.createReadStream(filePath);

    // Parte inicial del multipart
    res.write(`--${boundary}\r\n`);
    res.write(`Content-Disposition: form-data; name="apk"; filename="${fileName}"\r\n`);
    res.write(`Content-Type: application/vnd.android.package-archive\r\n\r\n`);

    // Pipe del archivo dentro del multipart
    fileStream.pipe(res, { end: false });

    fileStream.on("end", () => {
      // Final del multipart
      res.write(`\r\n--${boundary}--\r\n`);
      res.end();
    });

    fileStream.on("error", (err) => {
      return res.status(500).json({ error: "Error reading file" });
    });

  } catch (e) {
    return res.status(500).json({ error: "Download failed" });
  }
};

// const fs = require("fs");
// const path = require("path");

// exports.downloadAPK = async (req, res) => {
//   try {
//     const fileName = "app-debug.apk";
//     const filePath = path.resolve(process.env.APP_STORAGE, fileName);

//     if (!fs.existsSync(filePath))
//       return res.status(404).json({ error: "APK not found" });

//     return res.download(filePath, fileName);
//   } catch (e) {
//     return res.status(500).json({ error: "Download failed" });
//   }
// };

