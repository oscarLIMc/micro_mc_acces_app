const router = require("express").Router();
const decryptAES = require("../middleware/decryptAES");
const controller = require("../controllers/clientController");

/**
 * @swagger
 * /client/register:
 *   post:
 *     summary: Register a new client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   email:
 *                     type: string
 *               - $ref: '#/components/schemas/AESPayload'
 *     responses:
 *       201:
 *         description: Client created
 */
router.post("/register", decryptAES, controller.register);

module.exports = router;
