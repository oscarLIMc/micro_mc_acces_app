const router = require("express").Router();
const controller = require("../controllers/testController");

/**
 * @swagger
 * /test/login:
 *   get:
 *     tags: [Tests]
 *     summary: Comprueba la conexión y devuelve un objeto de prueba
 *     responses:
 *       200:
 *         description: Respuesta genérica con Informacion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Generic'
 */
router.get("/login", controller.testConnection);

module.exports = router;