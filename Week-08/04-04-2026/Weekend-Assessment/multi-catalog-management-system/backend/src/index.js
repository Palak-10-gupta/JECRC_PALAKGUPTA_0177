// src/index.js
const express        = require('express');
const cors           = require('cors');
const morgan         = require('morgan');
const swaggerUi      = require('swagger-ui-express');
const swaggerSpec    = require('./config/swagger');
const catalogRoutes  = require('./routes/catalogRoutes');
const billRoutes     = require('./routes/billRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── SWAGGER ──────────────────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #FF6B35, #F7931E); }
    .swagger-ui .topbar-wrapper img { display: none; }
    .swagger-ui .topbar-wrapper::after { content: '⚡ BillGen API'; color: white; font-size: 1.2rem; font-weight: bold; }
    .swagger-ui .info .title { color: #FF6B35; }
    body { background: #0f0e17; }
    .swagger-ui { color: #fffffe; }
  `,
  customSiteTitle: 'BillGen API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/catalogs', catalogRoutes);
app.use('/api/bills',    billRoutes);

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status:    'OK',
    message:   'Multi-Catalog Bill Generator API is running',
    timestamp: new Date().toISOString(),
    docs:      `http://localhost:${PORT}/api-docs`,
  });
});

// ─── ROOT ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name:    'Multi-Catalog Bill Generator API',
    version: '1.0.0',
    docs:    `http://localhost:${PORT}/api-docs`,
    endpoints: {
      catalogs: `http://localhost:${PORT}/api/catalogs`,
      bills:    `http://localhost:${PORT}/api/bills`,
      summary:  `http://localhost:${PORT}/api/bills/summary/daily`,
    },
  });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// ─── ERROR HANDLER ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   ⚡  BillGen API Server Started         ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  Server  →  http://localhost:${PORT}       ║`);
  console.log(`║  Swagger →  http://localhost:${PORT}/api-docs ║`);
  console.log('╚══════════════════════════════════════════╝\n');
});

module.exports = app;