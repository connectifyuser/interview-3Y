const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "Laptop"
 *     responses:
 *       200:
 *         description: Array of products
 */
router.get('/search', productController.searchProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Returns product details
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products list (paginated)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Paginated product array
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cost_price:
 *                 type: number
 *               sale_price:
 *                 type: number
 *               status:
 *                 type: string
 *             example:
 *               name: "Wireless Mouse"
 *               cost_price: 15.50
 *               sale_price: 29.99
 *               status: "pending"
 *     responses:
 *       201:
 *         description: Created product
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cost_price:
 *                 type: number
 *               sale_price:
 *                 type: number
 *               status:
 *                 type: string
 *             example:
 *               name: "Wireless Mouse Updated"
 *               cost_price: 14.50
 *               sale_price: 24.99
 *               status: "done"
 *     responses:
 *       200:
 *         description: Updated product details
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Deleted confirmation
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;
