// utils/aesGcmDecryptWithKey.js
const crypto = require('crypto');

function decryptAes128GcmBase64({ dataBase64, ivBase64, tagBase64, keyBuf }) {
  if (!keyBuf || keyBuf.length !== 16) throw new Error('AES key must be 16 bytes');

  const iv = Buffer.from(ivBase64, 'base64');     // IV esperado 12 bytes recomendados
  const data = Buffer.from(dataBase64, 'base64'); // ciphertext (sin tag)
  const tag = Buffer.from(tagBase64, 'base64');   // auth tag 16 bytes

  // reconstruir ciphertext con tag al final para Node crypto API (alternativa)
  const cipherBytes = Buffer.concat([data, tag]);

  const decipher = crypto.createDecipheriv('aes-128-gcm', keyBuf, iv);
  // en Node, cuando tag está separado: setAuthTag
  decipher.setAuthTag(tag);

  let out = decipher.update(data, undefined, 'utf8');
  out += decipher.final('utf8'); // si falla, lanza excepción
  return out; // texto plano en UTF-8
}

module.exports = decryptAes128GcmBase64;
