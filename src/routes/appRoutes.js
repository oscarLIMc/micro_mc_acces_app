const router = require("express").Router();
const auth = require("../middleware/authJWT");
const controller = require("../controllers/appController");

/**
 * @swagger
 * /app/download:
 *   post:
 *     summary: Download latest APK (multipart)
 *     tags: [App]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT opcional, ya viene del header Authorization
 *                 example: "jwt_token_here"
 *     responses:
 *       200:
 *         description: APK as multipart/form-data
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 apk:
 *                   type: string
 *                   format: binary
 *                   description: APK file
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: APK not found
 *       500:
 *         description: Server error
 */
router.post("/download", auth, controller.downloadAPK);

module.exports = router;
