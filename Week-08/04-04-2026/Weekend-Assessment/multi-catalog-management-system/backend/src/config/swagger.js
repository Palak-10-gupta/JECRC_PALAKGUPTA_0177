// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Multi-Catalog Bill Generator API',
      version: '1.0.0',
      description: `
## Multi-Catalog Bill Generator System

A complete REST API for managing catalogs and bills/invoices.

### Features
- **Catalog Management**: Entrance Fees, Donations, Selling Items, Custom Items
- **Bill Operations**: Create, Read, Update, Delete bills
- **Discount Support**: Percentage or fixed-amount discounts
- **Tax Calculation**: Configurable tax rates
- **Invoice Generation**: Unique invoice numbers with date stamps
- **Daily Sales Summary**: Aggregated sales reporting

### Base URL
All endpoints are prefixed with \`/api\`
      `,
      contact: {
        name: 'Bill Generator Support',
        email: 'support@billgenerator.com',
      },
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development Server' },
    ],
    tags: [
      { name: 'Catalogs',  description: 'Catalog item management (entrance, donation, selling)' },
      { name: 'Bills',     description: 'Bill / invoice operations' },
      { name: 'Dashboard', description: 'Sales summaries and analytics' },
    ],
    components: {
      schemas: {
        CatalogItem: {
          type: 'object',
          properties: {
            id:          { type: 'string', example: 'e1' },
            name:        { type: 'string', example: 'Adult Ticket' },
            price:       { type: 'number', example: 25.00 },
            description: { type: 'string', example: 'Standard adult entry' },
            category:    { type: 'string', enum: ['entrance', 'donation', 'selling', 'custom'] },
            active:      { type: 'boolean', example: true },
            isCustom:    { type: 'boolean', example: false },
          },
        },
        BillItem: {
          type: 'object',
          required: ['name', 'price', 'quantity'],
          properties: {
            id:       { type: 'string' },
            name:     { type: 'string',  example: 'Adult Ticket' },
            category: { type: 'string',  example: 'entrance' },
            price:    { type: 'number',  example: 25.00 },
            quantity: { type: 'integer', example: 2 },
            total:    { type: 'number',  example: 50.00 },
          },
        },
        Bill: {
          type: 'object',
          properties: {
            id:             { type: 'string' },
            invoiceNumber:  { type: 'string',  example: 'INV-20240101-0001' },
            status:         { type: 'string',  enum: ['draft', 'paid', 'cancelled'] },
            customerName:   { type: 'string',  example: 'Alice Johnson' },
            customerEmail:  { type: 'string',  example: 'alice@example.com' },
            customerPhone:  { type: 'string',  example: '+1-555-0101' },
            items:          { type: 'array',   items: { $ref: '#/components/schemas/BillItem' } },
            subtotal:       { type: 'number',  example: 86.00 },
            discountType:   { type: 'string',  enum: ['none', 'percentage', 'fixed'] },
            discountValue:  { type: 'number',  example: 10 },
            discountAmount: { type: 'number',  example: 8.60 },
            taxRate:        { type: 'number',  example: 8.5 },
            taxAmount:      { type: 'number',  example: 6.58 },
            total:          { type: 'number',  example: 83.98 },
            notes:          { type: 'string',  example: 'Family visit' },
            createdAt:      { type: 'string',  format: 'date-time' },
            updatedAt:      { type: 'string',  format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string',  example: 'Resource not found' },
            errors:  { type: 'array',   items: { type: 'string' } },
          },
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string',  example: 'Operation successful' },
            data:    { type: 'object' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);