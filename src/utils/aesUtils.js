const crypto = require("crypto");
const AES_KEY = require("../config/AES");

function encryptAES(obj) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", AES_KEY, iv);

  const plaintext = JSON.stringify(obj);
  let encrypted = cipher.update(plaintext, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("base64"),
    data: encrypted.toString("base64"),
    tag: tag.toString("base64"),
  };
}

function decryptAES(data, iv, tag) {
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    AES_KEY,
    Buffer.from(iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(tag, "base64"));
  let decrypted = decipher.update(Buffer.from(data, "base64"), null, "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted);
}

// Funcion para descifrar AES-GCM con clave derivada de contraseña (16 bytes)
function decryptAES_GCM({ data, iv, tag, password }) {
    // La key son los PRIMEROS 16 bytes de la contraseña
    const keyBytes = Buffer.alloc(16);
    const pwdBytes = Buffer.from(password, "utf8");
    pwdBytes.copy(keyBytes, 0, 0, Math.min(16, pwdBytes.length));

    const decipher = crypto.createDecipheriv(
        "aes-128-gcm",
        keyBytes,
        Buffer.from(iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(tag, "base64"));

    let decrypted = decipher.update(data, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

module.exports = { encryptAES, decryptAES, decryptAES_GCM };

