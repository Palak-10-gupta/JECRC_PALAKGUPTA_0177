// src/controllers/billController.js
const { billsStore, generateInvoiceNumber, uuidv4 } = require('../models/store');

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function calcBill(items, discountType, discountValue, taxRate) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = subtotal * (discountValue / 100);
  } else if (discountType === 'fixed') {
    discountAmount = Math.min(discountValue, subtotal);
  }

  const taxable  = subtotal - discountAmount;
  const taxAmount = taxable * (taxRate / 100);
  const total     = taxable + taxAmount;

  return {
    subtotal:       parseFloat(subtotal.toFixed(2)),
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    taxAmount:      parseFloat(taxAmount.toFixed(2)),
    total:          parseFloat(total.toFixed(2)),
  };
}

function enrichItems(rawItems) {
  return rawItems.map(item => ({
    id:       item.id || uuidv4(),
    name:     item.name,
    category: item.category || 'custom',
    price:    parseFloat(item.price),
    quantity: parseInt(item.quantity, 10),
    total:    parseFloat((item.price * item.quantity).toFixed(2)),
  }));
}

// ─── CONTROLLERS ─────────────────────────────────────────────────────────────

// GET /api/bills
const getAllBills = (req, res) => {
  try {
    const { status, search, startDate, endDate, sortBy = 'createdAt', order = 'desc' } = req.query;
    let results = [...billsStore];

    if (status)    results = results.filter(b => b.status === status);
    if (startDate) results = results.filter(b => new Date(b.createdAt) >= new Date(startDate));
    if (endDate)   results = results.filter(b => new Date(b.createdAt) <= new Date(endDate + 'T23:59:59'));

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(b =>
        b.invoiceNumber.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q)  ||
        (b.customerEmail && b.customerEmail.toLowerCase().includes(q))
      );
    }

    results.sort((a, b) => {
      let valA = a[sortBy], valB = b[sortBy];
      if (sortBy === 'total' || sortBy === 'subtotal') {
        valA = parseFloat(valA); valB = parseFloat(valB);
      } else {
        valA = String(valA); valB = String(valB);
      }
      return order === 'asc'
        ? (valA < valB ? -1 : valA > valB ? 1 : 0)
        : (valA > valB ? -1 : valA < valB ? 1 : 0);
    });

    res.json({ success: true, data: results, count: results.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bills/:id
const getBillById = (req, res) => {
  try {
    const bill = billsStore.find(b => b.id === req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
    res.json({ success: true, data: bill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/bills
const createBill = (req, res) => {
  try {
    const {
      customerName  = '',
      customerEmail = '',
      customerPhone = '',
      items         = [],
      discountType  = 'none',
      discountValue = 0,
      taxRate       = 8.5,
      notes         = '',
      status        = 'draft',
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one item is required' });
    }

    const enriched = enrichItems(items);
    const { subtotal, discountAmount, taxAmount, total } = calcBill(enriched, discountType, parseFloat(discountValue), parseFloat(taxRate));

    const now  = new Date().toISOString();
    const bill = {
      id:            uuidv4(),
      invoiceNumber: generateInvoiceNumber(),
      status,
      customerName,
      customerEmail,
      customerPhone,
      items:         enriched,
      subtotal,
      discountType,
      discountValue:  parseFloat(discountValue),
      discountAmount,
      taxRate:        parseFloat(taxRate),
      taxAmount,
      total,
      notes,
      createdAt: now,
      updatedAt: now,
    };

    billsStore.push(bill);
    res.status(201).json({ success: true, message: 'Bill created', data: bill });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/bills/:id
const updateBill = (req, res) => {
  try {
    const idx = billsStore.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });

    const existing = billsStore[idx];
    const {
      customerName, customerEmail, customerPhone,
      items, discountType, discountValue, taxRate,
      notes, status,
    } = req.body;

    const updatedItems = items ? enrichItems(items) : existing.items;
    const dType  = discountType  !== undefined ? discountType  : existing.discountType;
    const dValue = discountValue !== undefined ? parseFloat(discountValue) : existing.discountValue;
    const tRate  = taxRate       !== undefined ? parseFloat(taxRate)       : existing.taxRate;

    const { subtotal, discountAmount, taxAmount, total } = calcBill(updatedItems, dType, dValue, tRate);

    const updated = {
      ...existing,
      customerName:   customerName  !== undefined ? customerName  : existing.customerName,
      customerEmail:  customerEmail !== undefined ? customerEmail : existing.customerEmail,
      customerPhone:  customerPhone !== undefined ? customerPhone : existing.customerPhone,
      items:          updatedItems,
      discountType:   dType,
      discountValue:  dValue,
      discountAmount,
      taxRate:        tRate,
      taxAmount,
      subtotal,
      total,
      notes:   notes  !== undefined ? notes  : existing.notes,
      status:  status !== undefined ? status : existing.status,
      updatedAt: new Date().toISOString(),
    };

    billsStore[idx] = updated;
    res.json({ success: true, message: 'Bill updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/bills/:id/status
const updateBillStatus = (req, res) => {
  try {
    const idx = billsStore.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
    const { status } = req.body;
    if (!['draft', 'paid', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Use: draft, paid, cancelled' });
    }
    billsStore[idx].status    = status;
    billsStore[idx].updatedAt = new Date().toISOString();
    res.json({ success: true, message: `Bill marked as ${status}`, data: billsStore[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/bills/:id
const deleteBill = (req, res) => {
  try {
    const idx = billsStore.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'Bill not found' });
    const removed = billsStore.splice(idx, 1)[0];
    res.json({ success: true, message: 'Bill deleted', data: removed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bills/summary/daily
const getDailySummary = (req, res) => {
  try {
    const targetDate = req.query.date || new Date().toISOString().slice(0, 10);
    const dayBills   = billsStore.filter(b => b.createdAt.startsWith(targetDate));
    const paidBills  = dayBills.filter(b => b.status === 'paid');

    const totalRevenue   = paidBills.reduce((s, b) => s + b.total, 0);
    const totalTax       = paidBills.reduce((s, b) => s + b.taxAmount, 0);
    const totalDiscounts = paidBills.reduce((s, b) => s + b.discountAmount, 0);

    const categorySales = {};
    paidBills.forEach(b => {
      b.items.forEach(item => {
        if (!categorySales[item.category]) categorySales[item.category] = 0;
        categorySales[item.category] += item.total;
      });
    });

    const topItems = {};
    paidBills.forEach(b => {
      b.items.forEach(item => {
        if (!topItems[item.name]) topItems[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        topItems[item.name].quantity += item.quantity;
        topItems[item.name].revenue  += item.total;
      });
    });
    const topItemsList = Object.values(topItems).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    res.json({
      success: true,
      data: {
        date:          targetDate,
        totalBills:    dayBills.length,
        paidBills:     paidBills.length,
        draftBills:    dayBills.filter(b => b.status === 'draft').length,
        cancelledBills:dayBills.filter(b => b.status === 'cancelled').length,
        totalRevenue:  parseFloat(totalRevenue.toFixed(2)),
        totalTax:      parseFloat(totalTax.toFixed(2)),
        totalDiscounts:parseFloat(totalDiscounts.toFixed(2)),
        categorySales,
        topItems:      topItemsList,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  updateBillStatus,
  deleteBill,
  getDailySummary,
};