// src/controllers/catalogController.js
const { catalogsStore, uuidv4 } = require('../models/store');

const VALID_CATEGORIES = ['entrance', 'donation', 'selling'];

// GET /api/catalogs
const getAllCatalogs = (req, res) => {
  try {
    res.json({
      success: true,
      data: catalogsStore,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/catalogs/:category
const getCatalogByCategory = (req, res) => {
  try {
    const { category } = req.params;
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
      });
    }
    const items = catalogsStore[category] || [];
    res.json({ success: true, data: items, count: items.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/catalogs/:category
const addCatalogItem = (req, res) => {
  try {
    const { category } = req.params;
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    const { name, price, description } = req.body;
    if (!name || price === undefined || price === null) {
      return res.status(400).json({ success: false, message: 'name and price are required' });
    }
    const newItem = {
      id: uuidv4(),
      name: name.trim(),
      price: parseFloat(price),
      description: description || '',
      category,
      active: true,
      isCustom: false,
    };
    catalogsStore[category].push(newItem);
    res.status(201).json({ success: true, message: 'Catalog item added', data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/catalogs/:category/:id
const updateCatalogItem = (req, res) => {
  try {
    const { category, id } = req.params;
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    const idx = catalogsStore[category].findIndex(i => i.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    const { name, price, description, active } = req.body;
    const updated = {
      ...catalogsStore[category][idx],
      ...(name        !== undefined && { name: name.trim() }),
      ...(price       !== undefined && { price: parseFloat(price) }),
      ...(description !== undefined && { description }),
      ...(active      !== undefined && { active }),
    };
    catalogsStore[category][idx] = updated;
    res.json({ success: true, message: 'Item updated', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/catalogs/:category/:id
const deleteCatalogItem = (req, res) => {
  try {
    const { category, id } = req.params;
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }
    const idx = catalogsStore[category].findIndex(i => i.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    const removed = catalogsStore[category].splice(idx, 1)[0];
    res.json({ success: true, message: 'Item deleted', data: removed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllCatalogs,
  getCatalogByCategory,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
};