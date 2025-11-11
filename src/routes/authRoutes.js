const router = require("express").Router();
const controller = require("../controllers/authController");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   username: { type: string }
 *                   password: { type: string }
 *               - $ref: '#/components/schemas/AESPayload'
 *     responses:
 *       200:
 *         description: Auth OK
 */
router.post("/login", controller.login);

module.exports = router;
