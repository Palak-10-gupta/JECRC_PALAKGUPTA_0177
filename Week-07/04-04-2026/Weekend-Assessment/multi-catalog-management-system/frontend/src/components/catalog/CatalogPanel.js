// src/components/catalog/CatalogPanel.js
import React, { useState, useEffect } from 'react';
import { catalogApi } from '../../utils/api';
import { useApp } from '../../Context/AppContext';

var TABS = [
  { key: 'entrance', label: 'Entrance',  icon: '🎟' },
  { key: 'donation', label: 'Donation',  icon: '💝' },
  { key: 'selling',  label: 'Selling',   icon: '🛍' },
  { key: 'custom',   label: 'Custom',    icon: '✨' },
];

var CatalogPanel = function ({ onAddItem }) {
  var app = useApp();
  var [activeTab, setActiveTab] = useState('entrance');
  var [catalogs, setCatalogs]   = useState({ entrance: [], donation: [], selling: [] });
  var [loading, setLoading]     = useState(true);
  var [customForm, setCustomForm] = useState({ name: '', price: '', description: '' });
  var [customQty, setCustomQty]   = useState(1);
  var [donationAmount, setDonationAmount] = useState('');

  useEffect(function () {
    setLoading(true);
    catalogApi.getAll()
      .then(function (res) { setCatalogs(res.data.data); })
      .catch(function () { app.addToast('Failed to load catalogs', 'danger'); })
      .finally(function () { setLoading(false); });
  }, []);

  function handleCatalogAdd(item) {
    var price = item.isCustom ? parseFloat(donationAmount) : item.price;
    if (item.isCustom && (!price || price <= 0)) {
      app.addToast('Enter a valid donation amount', 'warning');
      return;
    }
    onAddItem({ name: item.name, category: item.category, price: price, quantity: 1, description: item.description });
    if (item.isCustom) setDonationAmount('');
  }

  function handleCustomAdd() {
    if (!customForm.name.trim()) { app.addToast('Item name is required', 'warning'); return; }
    var price = parseFloat(customForm.price);
    if (!price || price <= 0) { app.addToast('Enter a valid price', 'warning'); return; }
    onAddItem({ name: customForm.name.trim(), category: 'custom', price: price, quantity: parseInt(customQty) || 1, description: customForm.description });
    setCustomForm({ name: '', price: '', description: '' });
    setCustomQty(1);
  }

  function handleChange(field, value) {
    setCustomForm(function (prev) { return Object.assign({}, prev, { [field]: value }); });
  }

  if (loading) {
    return (
      <div className="loading-center">
        <span className="spinner-lg spinner" />
        <span>Loading catalogs...</span>
      </div>
    );
  }

  var currentItems = catalogs[activeTab] || [];

  return (
    <div>
      {/* Tabs */}
      <div className="catalog-tabs" style={{ marginBottom: '1.2rem' }}>
        {TABS.map(function (tab) {
          return (
            <button
              key={tab.key}
              className={'catalog-tab' + (activeTab === tab.key ? ' active' : '')}
              onClick={function () { return setActiveTab(tab.key); }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Items Panel */}
      {activeTab === 'custom' ? (
        <div>
          <p style={{ color: 'var(--text-3)', fontSize: '0.82rem', marginBottom: '1rem' }}>
            Add a completely custom line item not found in any catalog.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1rem' }}>
            <div className="form-group">
              <label className="form-label">Item Name *</label>
              <input type="text" className="form-input" placeholder="e.g. Special Service"
                value={customForm.name} onChange={function (e) { return handleChange('name', e.target.value); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Unit Price ($) *</label>
              <input type="number" className="form-input" placeholder="0.00" min="0" step="0.01"
                value={customForm.price} onChange={function (e) { return handleChange('price', e.target.value); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <input type="text" className="form-input" placeholder="Optional description"
                value={customForm.description} onChange={function (e) { return handleChange('description', e.target.value); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-input" min="1"
                value={customQty} onChange={function (e) { return setCustomQty(e.target.value); }} />
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleCustomAdd}>
            ＋ Add Custom Item to Bill
          </button>
        </div>
      ) : (
        /* Catalog grid */
        <div>
          {currentItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-state-icon">📦</div>
              <h3>No items in this catalog</h3>
            </div>
          ) : (
            <div className="catalog-grid">
              {currentItems.filter(function (i) { return i.active; }).map(function (item) {
                return (
                  <div key={item.id} className="catalog-item" onClick={function () { return handleCatalogAdd(item); }}>
                    <div className="catalog-item-add">+</div>
                    <span className={'badge badge-' + item.category} style={{ fontSize: '0.60rem', alignSelf: 'flex-start', marginBottom: '0.3rem' }}>
                      {item.category}
                    </span>
                    <div className="catalog-item-name">{item.name}</div>
                    <div className="catalog-item-desc">{item.description}</div>
                    {item.isCustom ? (
                      <div style={{ marginTop: '0.5rem' }} onClick={function (e) { return e.stopPropagation(); }}>
                        <input
                          type="number" className="form-input" placeholder="Enter amount ($)"
                          min="0" step="0.01" style={{ marginBottom: '0.4rem' }}
                          value={donationAmount}
                          onChange={function (e) { return setDonationAmount(e.target.value); }}
                        />
                        <button className="btn btn-primary btn-sm" style={{ width: '100%' }}
                          onClick={function () { return handleCatalogAdd(item); }}>
                          Add Custom Donation
                        </button>
                      </div>
                    ) : (
                      <div className="catalog-item-price">${item.price.toFixed(2)}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CatalogPanel;