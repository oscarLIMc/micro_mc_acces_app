// const { User, Token } = require('../models');
const passwordToAes128Key = require('../utils/aesKeyFromPassword');
const decryptAes128GcmBase64 = require('../utils/aesGcmDecryptWithKey');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../config/sqlserver');

async function login(req, res) {
  try {
    const { iv, usuario, data, tag } = req.body;

    console.log('Login attempt for user:', usuario);
    if (!iv || !usuario || !data || !tag) {
      console.log('Error: el request no tiene todos los campos necesarios');
      return res.status(400).json({ error: 'Missing fields' });
    }

    const user = await db.query(`SELECT CAT_LO_USUARIO, dbo.DECRYPTFMC(CAT_LO_CONTRASENA) PASS FROM CAT_LOGINS WHERE CAT_LO_USUARIO = '${usuario}'`, { type: db.QueryTypes.SELECT })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    console.log("Usuario encontrado:", user[0].CAT_LO_USUARIO);

    const storedPassword = user[0].PASS;

    // Construir key AES-128 (16 bytes) desde la contraseña almacenada
    const keyBuf = passwordToAes128Key(storedPassword);
    if (!keyBuf) {
      // No tiene 16 bytes: rechazamos (según spec)
      return res.status(400).json({ error: 'La contraseña almacenada no cumple con el requisito de 16 bytes (o 128 bits).' });
    }

    // Intentar descifrar: data fue cifrado con la misma contraseña
    let decrypted;
    try {
      decrypted = decryptAes128GcmBase64({
        dataBase64: data,
        ivBase64: iv,
        tagBase64: tag,
        keyBuf: keyBuf
      });
    } catch (e) {
      // fallo de autenticación o tag mismatch
      console.error('Error de decifrado AES:', e.message);
      return res.status(401).json({ error: 'payload = Credenciales Incorrectas' });
    }

    // Según spec, la contraseña "se cifra a sí misma", así que la salida descendida debería ser la contraseña
    // Comparamos la salida con storedPassword (asegúrate que ambos usan la misma codificación)
    if (decrypted !== storedPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // OK -> generar JWT (1 minuto)
    const payload = { id: user[0].CAT_LO_USUARIO, username: user[0].CAT_LO_USUARIO };
    const tokenStr = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
      issuer: jwtConfig.issuer
    });

    console.log("token generado para usuario:", tokenStr);
    return res.json({ token: tokenStr }); // 200 OK
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { login };

// use BODESA;

// select CAT_LO_USUARIO, dbo.DECRYPTFMC(CAT_LO_CONTRASENA) 
// FROM CAT_LOGINS 

// UPDATE CAT_LOGINS
// SET CAT_LO_CONTRASENA = dbo.ENCRYPTFMC('1234567891234567*')
// WHERE CAT_LO_USUARIO = 'AALEISSA';

