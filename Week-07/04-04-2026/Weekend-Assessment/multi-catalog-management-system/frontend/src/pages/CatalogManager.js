// src/pages/CatalogManager.js
import React, { useState, useEffect, useCallback } from 'react';
import { catalogApi } from '../utils/api';
import { useApp } from '../Context/AppContext';

var CATEGORIES = [
  { key: 'entrance', label: 'Entrance',  icon: '🎟' },
  { key: 'donation', label: 'Donation',  icon: '💝' },
  { key: 'selling',  label: 'Selling',   icon: '🛍' },
];

var catColor = function (cat) {
  if (cat === 'entrance') return 'var(--sky)';
  if (cat === 'donation') return 'var(--rose)';
  if (cat === 'selling')  return 'var(--emerald)';
  return 'var(--text-3)';
};

var EMPTY_FORM = { name: '', price: '', description: '' };

var CatalogManager = function () {
  var app = useApp();
  var [activeTab, setActiveTab] = useState('entrance');
  var [catalogs, setCatalogs]   = useState({ entrance: [], donation: [], selling: [] });
  var [loading, setLoading]     = useState(true);
  var [form, setForm]           = useState(EMPTY_FORM);
  var [editingId, setEditingId] = useState(null);
  var [saving, setSaving]       = useState(false);
  var [deleting, setDeleting]   = useState(null);

  var fetchCatalogs = useCallback(function () {
    setLoading(true);
    catalogApi.getAll()
      .then(function (res) { setCatalogs(res.data.data); })
      .catch(function (err) { app.addToast(err.message, 'danger'); })
      .finally(function () { setLoading(false); });
  }, []);

  useEffect(function () { fetchCatalogs(); }, [fetchCatalogs]);

  var handleFormChange = function (field, val) {
    setForm(function (prev) { return Object.assign({}, prev, { [field]: val }); });
  };

  var startEdit = function (item) {
    setEditingId(item.id);
    setForm({ name: item.name, price: item.price, description: item.description || '' });
  };

  var cancelEdit = function () {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  var handleSave = async function () {
    if (!form.name.trim()) { app.addToast('Name is required', 'warning'); return; }
    var price = parseFloat(form.price);
    if (isNaN(price) || price < 0) { app.addToast('Enter a valid price', 'warning'); return; }
    setSaving(true);
    try {
      var payload = { name: form.name.trim(), price: price, description: form.description };
      if (editingId) {
        await catalogApi.update(activeTab, editingId, payload);
        app.addToast('Item updated', 'success');
      } else {
        await catalogApi.add(activeTab, payload);
        app.addToast('Item added', 'success');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchCatalogs();
    } catch (err) {
      app.addToast(err.message, 'danger');
    } finally {
      setSaving(false);
    }
  };

  var handleDelete = async function (id, name) {
    if (!window.confirm('Delete "' + name + '"?')) return;
    setDeleting(id);
    try {
      await catalogApi.remove(activeTab, id);
      app.addToast('"' + name + '" deleted', 'success');
      fetchCatalogs();
    } catch (err) {
      app.addToast(err.message, 'danger');
    } finally {
      setDeleting(null);
    }
  };

  var handleToggleActive = async function (item) {
    try {
      await catalogApi.update(activeTab, item.id, { active: !item.active });
      app.addToast(item.name + ' ' + (item.active ? 'deactivated' : 'activated'), 'success');
      fetchCatalogs();
    } catch (err) {
      app.addToast(err.message, 'danger');
    }
  };

  var items = catalogs[activeTab] || [];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>📦 Catalog Manager</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>
          Add, edit, or remove items from each catalog category.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {CATEGORIES.map(function (cat) {
          var active = activeTab === cat.key;
          var cc = catColor(cat.key);
          return (
            <button key={cat.key} onClick={function () { setActiveTab(cat.key); cancelEdit(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '0.55rem 1.1rem', borderRadius: 'var(--r-md)',
                border: active ? '1px solid ' + cc + '44' : '1px solid var(--border-1)',
                background: active ? cc + '18' : 'var(--bg-2)',
                color: active ? cc : 'var(--text-3)',
                fontWeight: active ? '700' : '500',
                fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.18s',
              }}>
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span style={{
                background: active ? cc + '33' : 'var(--bg-3)',
                color: active ? cc : 'var(--text-4)',
                borderRadius: 'var(--r-full)', padding: '1px 7px',
                fontSize: '0.68rem', fontWeight: '700',
              }}>
                {(catalogs[cat.key] || []).length}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>

        {/* Items list */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {CATEGORIES.find(function (c) { return c.key === activeTab; }).icon}&nbsp;
              {CATEGORIES.find(function (c) { return c.key === activeTab; }).label} Items
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{items.length} items</span>
          </div>

          {loading ? (
            <div className="loading-center" style={{ padding: '2.5rem' }}>
              <span className="spinner-lg spinner" />
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state" style={{ padding: '2.5rem' }}>
              <div className="empty-state-icon">📦</div>
              <h3>No items yet</h3>
              <p>Use the form to add your first item to this catalog.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,107,53,0.04)', borderBottom: '1px solid var(--border-1)' }}>
                  {['Name & Description', 'Price', 'Status', 'Actions'].map(function (h) {
                    return (
                      <th key={h} style={{ padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {items.map(function (item) {
                  return (
                    <tr key={item.id}
                      style={{ borderBottom: '1px solid var(--border-1)', opacity: item.active ? 1 : 0.45 }}
                      onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(255,107,53,0.03)'; }}
                      onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent'; }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-1)' }}>{item.name}</div>
                        {item.description && (
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-3)' }}>{item.description}</div>
                        )}
                        {item.isCustom && (
                          <span style={{ fontSize: '0.62rem', color: 'var(--gold)', fontStyle: 'italic' }}>custom amount</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--mono)', fontWeight: '700', color: 'var(--orange)', whiteSpace: 'nowrap' }}>
                        {item.isCustom ? '—' : '$' + item.price.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <button onClick={function () { return handleToggleActive(item); }}
                          style={{
                            padding: '2px 10px', borderRadius: 'var(--r-full)',
                            background: item.active ? 'var(--emerald)22' : 'var(--rose)22',
                            border: '1px solid ' + (item.active ? 'var(--emerald)44' : 'var(--rose)44'),
                            color: item.active ? 'var(--emerald)' : 'var(--rose)',
                            fontSize: '0.68rem', fontWeight: '700', textTransform: 'uppercase',
                            cursor: 'pointer', letterSpacing: '0.08em',
                          }}>
                          {item.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {!item.isCustom && (
                            <button className="btn-icon" title="Edit" onClick={function () { return startEdit(item); }}>✏️</button>
                          )}
                          <button className="btn-icon danger" title="Delete"
                            disabled={deleting === item.id}
                            onClick={function () { return handleDelete(item.id, item.name); }}>
                            {deleting === item.id ? '…' : '🗑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Add / Edit form */}
        <div className="card">
          <h2 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1.1rem' }}>
            {editingId ? '✏️ Edit Item' : '＋ Add New Item'}
          </h2>
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input type="text" className="form-input" placeholder="Item name"
              value={form.name}
              onChange={function (e) { return handleFormChange('name', e.target.value); }} />
          </div>
          <div className="form-group">
            <label className="form-label">Price ($) *</label>
            <input type="number" className="form-input" placeholder="0.00" min="0" step="0.01"
              value={form.price}
              onChange={function (e) { return handleFormChange('price', e.target.value); }} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" className="form-input" placeholder="Short description..."
              value={form.description}
              onChange={function (e) { return handleFormChange('description', e.target.value); }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave} disabled={saving}>
              {saving ? <><span className="spinner" /><span>Saving...</span></> : (editingId ? '✓ Update Item' : '＋ Add Item')}
            </button>
            {editingId && (
              <button className="btn btn-ghost" onClick={cancelEdit}>Cancel</button>
            )}
          </div>

          {/* Category info */}
          <div style={{ marginTop: '1.5rem', padding: '0.9rem', background: 'var(--bg-3)', borderRadius: 'var(--r-md)', border: '1px solid var(--border-1)' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '6px' }}>
              Current Category
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: '700', color: catColor(activeTab) }}>
              {CATEGORIES.find(function (c) { return c.key === activeTab; }).icon}
              {CATEGORIES.find(function (c) { return c.key === activeTab; }).label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogManager;