// src/routes/catalogRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/catalogController');

/**
 * @swagger
 * /api/catalogs:
 *   get:
 *     summary: Get all catalog items across all categories
 *     tags: [Catalogs]
 *     responses:
 *       200:
 *         description: All catalog items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     entrance: { type: array, items: { $ref: '#/components/schemas/CatalogItem' } }
 *                     donation: { type: array, items: { $ref: '#/components/schemas/CatalogItem' } }
 *                     selling:  { type: array, items: { $ref: '#/components/schemas/CatalogItem' } }
 */
router.get('/', ctrl.getAllCatalogs);

/**
 * @swagger
 * /api/catalogs/{category}:
 *   get:
 *     summary: Get catalog items by category
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [entrance, donation, selling]
 *         description: Catalog category
 *     responses:
 *       200:
 *         description: Items in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: array, items: { $ref: '#/components/schemas/CatalogItem' } }
 *                 count: { type: integer }
 *       400:
 *         description: Invalid category
 */
router.get('/:category', ctrl.getCatalogByCategory);

/**
 * @swagger
 * /api/catalogs/{category}:
 *   post:
 *     summary: Add a new item to a catalog
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [entrance, donation, selling]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name:        { type: string,  example: 'Premium Ticket' }
 *               price:       { type: number,  example: 45.00 }
 *               description: { type: string,  example: 'All-inclusive premium ticket' }
 *     responses:
 *       201:
 *         description: Item added successfully
 *       400:
 *         description: Validation error
 */
router.post('/:category', ctrl.addCatalogItem);

/**
 * @swagger
 * /api/catalogs/{category}/{id}:
 *   put:
 *     summary: Update a catalog item
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema: { type: string, enum: [entrance, donation, selling] }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:        { type: string }
 *               price:       { type: number }
 *               description: { type: string }
 *               active:      { type: boolean }
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */
router.put('/:category/:id', ctrl.updateCatalogItem);

/**
 * @swagger
 * /api/catalogs/{category}/{id}:
 *   delete:
 *     summary: Delete a catalog item
 *     tags: [Catalogs]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema: { type: string, enum: [entrance, donation, selling] }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */
router.delete('/:category/:id', ctrl.deleteCatalogItem);

module.exports = router;