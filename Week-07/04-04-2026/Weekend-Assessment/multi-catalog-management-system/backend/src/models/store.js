// src/models/store.js
// In-memory data store (simulates a database)

const { v4: uuidv4 } = require('uuid');

// ─── CATALOGS ────────────────────────────────────────────────────────────────

const catalogsStore = {
  entrance: [
    { id: 'e1', name: 'Adult Ticket',  price: 25.00, description: 'Standard adult entry',    category: 'entrance', active: true },
    { id: 'e2', name: 'Child Ticket',  price: 12.00, description: 'Children under 12',       category: 'entrance', active: true },
    { id: 'e3', name: 'Senior Ticket', price: 15.00, description: 'Age 65 and above',         category: 'entrance', active: true },
    { id: 'e4', name: 'VIP Pass',      price: 75.00, description: 'VIP lounge + priority entry', category: 'entrance', active: true },
    { id: 'e5', name: 'Family Pack',   price: 60.00, description: '2 Adults + 2 Children',   category: 'entrance', active: true },
    { id: 'e6', name: 'Group (10+)',   price: 18.00, description: 'Per person, min 10',       category: 'entrance', active: true },
  ],
  donation: [
    { id: 'd1', name: 'Bronze Donor',   price: 10.00,  description: 'Thank you for your support',   category: 'donation', active: true },
    { id: 'd2', name: 'Silver Donor',   price: 25.00,  description: 'Making a difference',           category: 'donation', active: true },
    { id: 'd3', name: 'Gold Donor',     price: 50.00,  description: 'Champion supporter',             category: 'donation', active: true },
    { id: 'd4', name: 'Platinum Donor', price: 100.00, description: 'Extraordinary contribution',     category: 'donation', active: true },
    { id: 'd5', name: 'Custom Donation',price: 0.00,   description: 'Enter your custom amount',      category: 'donation', active: true, isCustom: true },
  ],
  selling: [
    { id: 's1', name: 'T-Shirt (S/M)',   price: 20.00, description: 'Official merchandise',  category: 'selling', active: true },
    { id: 's2', name: 'T-Shirt (L/XL)',  price: 22.00, description: 'Official merchandise',  category: 'selling', active: true },
    { id: 's3', name: 'Coffee Mug',      price: 15.00, description: 'Branded souvenir mug',  category: 'selling', active: true },
    { id: 's4', name: 'Guide Book',      price: 12.00, description: 'Full color guide book', category: 'selling', active: true },
    { id: 's5', name: 'Coffee / Tea',    price: 4.50,  description: 'Hot beverages',         category: 'selling', active: true },
    { id: 's6', name: 'Snack Pack',      price: 8.00,  description: 'Assorted snacks',       category: 'selling', active: true },
    { id: 's7', name: 'Guided Tour',     price: 35.00, description: 'Per person 1hr tour',   category: 'selling', active: true },
    { id: 's8', name: 'Photography Pass',price: 18.00, description: 'Professional photo permit', category: 'selling', active: true },
  ],
};

// ─── BILLS ───────────────────────────────────────────────────────────────────

const billsStore = [];

// Seed some demo bills
const seedBills = () => {
  const now = new Date();

  billsStore.push({
    id: uuidv4(),
    invoiceNumber: 'INV-20240101-0001',
    status: 'paid',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    customerPhone: '+1-555-0101',
    items: [
      { id: uuidv4(), name: 'Adult Ticket',  category: 'entrance', price: 25.00, quantity: 2, total: 50.00 },
      { id: uuidv4(), name: 'Child Ticket',  category: 'entrance', price: 12.00, quantity: 1, total: 12.00 },
      { id: uuidv4(), name: 'Guide Book',    category: 'selling',  price: 12.00, quantity: 2, total: 24.00 },
    ],
    subtotal: 86.00,
    discountType: 'percentage',
    discountValue: 10,
    discountAmount: 8.60,
    taxRate: 8.5,
    taxAmount: 6.58,
    total: 83.98,
    notes: 'Family visit',
    createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
    updatedAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
  });

  billsStore.push({
    id: uuidv4(),
    invoiceNumber: 'INV-20240102-0002',
    status: 'draft',
    customerName: 'Bob Martinez',
    customerEmail: 'bob@example.com',
    customerPhone: '',
    items: [
      { id: uuidv4(), name: 'VIP Pass',       category: 'entrance', price: 75.00, quantity: 1, total: 75.00 },
      { id: uuidv4(), name: 'Gold Donor',     category: 'donation', price: 50.00, quantity: 1, total: 50.00 },
      { id: uuidv4(), name: 'Guided Tour',    category: 'selling',  price: 35.00, quantity: 1, total: 35.00 },
    ],
    subtotal: 160.00,
    discountType: 'fixed',
    discountValue: 20,
    discountAmount: 20.00,
    taxRate: 8.5,
    taxAmount: 11.90,
    total: 151.90,
    notes: 'VIP corporate client',
    createdAt: new Date(now.getTime() - 86400000).toISOString(),
    updatedAt: new Date(now.getTime() - 86400000).toISOString(),
  });

  billsStore.push({
    id: uuidv4(),
    invoiceNumber: 'INV-20240103-0003',
    status: 'paid',
    customerName: 'Carol Singh',
    customerEmail: 'carol@example.com',
    customerPhone: '+1-555-0303',
    items: [
      { id: uuidv4(), name: 'Senior Ticket',  category: 'entrance', price: 15.00, quantity: 2, total: 30.00 },
      { id: uuidv4(), name: 'Coffee / Tea',   category: 'selling',  price: 4.50,  quantity: 2, total: 9.00  },
      { id: uuidv4(), name: 'Silver Donor',   category: 'donation', price: 25.00, quantity: 1, total: 25.00 },
    ],
    subtotal: 64.00,
    discountType: 'none',
    discountValue: 0,
    discountAmount: 0,
    taxRate: 8.5,
    taxAmount: 5.44,
    total: 69.44,
    notes: '',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });
};

seedBills();

// ─── INVOICE NUMBER COUNTER ────────────────────────────────────────────────

let invoiceCounter = 4;

function generateInvoiceNumber() {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(invoiceCounter++).padStart(4, '0');
  return `INV-${dateStr}-${seq}`;
}

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

module.exports = {
  catalogsStore,
  billsStore,
  generateInvoiceNumber,
  uuidv4,
};