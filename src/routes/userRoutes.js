const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users by email
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: "test@example.com"
 *     responses:
 *       200:
 *         description: Array of users
 */
router.get('/', userController.getUsers);

module.exports = router;
