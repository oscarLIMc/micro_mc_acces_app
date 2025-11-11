const router = require("express").Router();
const decryptAES = require("../middleware/decryptAES");
const controller = require("../controllers/userController");

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create user for a client
 *     tags: [User]
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
 *                   clientId: { type: number }
 *               - $ref: '#/components/schemas/AESPayload'
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/create", controller.create);

module.exports = router;
