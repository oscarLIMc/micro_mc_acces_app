// utils/aesKeyFromPassword.js
module.exports = function passwordToAes128Key(password) {
  if (!password) return null;

  // Queremos exactamente 16 bytes. Si la contraseña en DB es un string,
  // convertimos a Buffer en UTF-8 y verificamos la longitud en bytes.
  const keyBuf = Buffer.from(password, 'utf8');
  console.log('Password tamaño en bytes:', keyBuf.length);
  if (keyBuf.length !== 16) return null; // requisito del spec
  return keyBuf; // Buffer(16) listo para usar en AES-128
};
