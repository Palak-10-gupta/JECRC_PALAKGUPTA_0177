// src/routes/billRoutes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/billController');

/**
 * @swagger
 * /api/bills/summary/daily:
 *   get:
 *     summary: Get daily sales summary
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           example: '2024-01-03'
 *         description: Date for summary (defaults to today, format YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Daily summary data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     date:           { type: string }
 *                     totalBills:     { type: integer }
 *                     paidBills:      { type: integer }
 *                     totalRevenue:   { type: number }
 *                     totalTax:       { type: number }
 *                     totalDiscounts: { type: number }
 *                     categorySales:  { type: object }
 *                     topItems:       { type: array }
 */
router.get('/summary/daily', ctrl.getDailySummary);

/**
 * @swagger
 * /api/bills:
 *   get:
 *     summary: Get all bills with optional filters
 *     tags: [Bills]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [draft, paid, cancelled] }
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by invoice number or customer name
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *         description: Filter from date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *         description: Filter to date (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [createdAt, total, customerName, invoiceNumber] }
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc] }
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of bills
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { type: array, items: { $ref: '#/components/schemas/Bill' } }
 *                 count: { type: integer }
 */
router.get('/', ctrl.getAllBills);

/**
 * @swagger
 * /api/bills/{id}:
 *   get:
 *     summary: Get a bill by ID
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Bill found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Bill' }
 *       404:
 *         description: Bill not found
 */
router.get('/:id', ctrl.getBillById);

/**
 * @swagger
 * /api/bills:
 *   post:
 *     summary: Create a new bill
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               customerName:  { type: string,  example: 'Alice Johnson' }
 *               customerEmail: { type: string,  example: 'alice@example.com' }
 *               customerPhone: { type: string,  example: '+1-555-0101' }
 *               items:
 *                 type: array
 *                 items: { $ref: '#/components/schemas/BillItem' }
 *               discountType:  { type: string,  enum: [none, percentage, fixed], example: 'percentage' }
 *               discountValue: { type: number,  example: 10 }
 *               taxRate:       { type: number,  example: 8.5 }
 *               notes:         { type: string,  example: 'Walk-in customer' }
 *               status:        { type: string,  enum: [draft, paid], example: 'draft' }
 *           example:
 *             customerName: "Alice Johnson"
 *             customerEmail: "alice@example.com"
 *             customerPhone: "+1-555-0101"
 *             items:
 *               - name: "Adult Ticket"
 *                 category: "entrance"
 *                 price: 25.00
 *                 quantity: 2
 *               - name: "Coffee / Tea"
 *                 category: "selling"
 *                 price: 4.50
 *                 quantity: 2
 *             discountType: "percentage"
 *             discountValue: 10
 *             taxRate: 8.5
 *             notes: "Weekend family visit"
 *             status: "draft"
 *     responses:
 *       201:
 *         description: Bill created
 *       400:
 *         description: Validation error
 */
router.post('/', ctrl.createBill);

/**
 * @swagger
 * /api/bills/{id}:
 *   put:
 *     summary: Update an existing bill
 *     tags: [Bills]
 *     parameters:
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
 *               customerName:  { type: string }
 *               customerEmail: { type: string }
 *               customerPhone: { type: string }
 *               items:         { type: array, items: { $ref: '#/components/schemas/BillItem' } }
 *               discountType:  { type: string, enum: [none, percentage, fixed] }
 *               discountValue: { type: number }
 *               taxRate:       { type: number }
 *               notes:         { type: string }
 *               status:        { type: string, enum: [draft, paid, cancelled] }
 *     responses:
 *       200:
 *         description: Bill updated
 *       404:
 *         description: Bill not found
 */
router.put('/:id', ctrl.updateBill);

/**
 * @swagger
 * /api/bills/{id}/status:
 *   patch:
 *     summary: Update bill status only
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [draft, paid, cancelled] }
 *           example:
 *             status: "paid"
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Bill not found
 */
router.patch('/:id/status', ctrl.updateBillStatus);

/**
 * @swagger
 * /api/bills/{id}:
 *   delete:
 *     summary: Delete a bill
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Bill deleted
 *       404:
 *         description: Bill not found
 */
router.delete('/:id', ctrl.deleteBill);

module.exports = router;