const router = require("express").Router();
const auth = require("../middleware/authJWT");
const controller = require("../controllers/appController");

/**
 * @swagger
 * /app/download:
 *   get:
 *     summary: Download latest APK
 *     tags: [App]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: APK download OK
 */
router.get("/download", auth, controller.downloadAPK);

module.exports = router;
