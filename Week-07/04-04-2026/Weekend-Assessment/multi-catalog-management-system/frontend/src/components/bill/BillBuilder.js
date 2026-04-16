// src/components/bill/BillBuilder.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { billApi } from '../../utils/api';
import { useApp } from '../../Context/AppContext';
import CatalogPanel from '../catalog/CatalogPanel';

var TAX_RATES = [0, 5, 8.5, 10, 12, 15, 18, 20];

function calcTotals(items, discountType, discountValue, taxRate) {
  var subtotal = items.reduce(function (s, i) { return s + (i.price * i.quantity); }, 0);
  var discountAmount = 0;
  if (discountType === 'percentage') discountAmount = subtotal * (parseFloat(discountValue) / 100);
  if (discountType === 'fixed')      discountAmount = Math.min(parseFloat(discountValue) || 0, subtotal);
  var taxable   = subtotal - discountAmount;
  var taxAmount = taxable * (parseFloat(taxRate) / 100);
  var total     = taxable + taxAmount;
  return {
    subtotal: subtotal, discountAmount: discountAmount,
    taxAmount: taxAmount, total: total,
  };
}

var BillBuilder = function ({ existingBill }) {
  var app      = useApp();
  var navigate = useNavigate();

  var [customer, setCustomer] = useState({
    name: '', email: '', phone: '',
  });
  var [items, setItems]           = useState([]);
  var [discountType, setDiscType] = useState('none');
  var [discountValue, setDiscVal] = useState('');
  var [taxRate, setTaxRate]       = useState(8.5);
  var [notes, setNotes]           = useState('');
  var [saving, setSaving]         = useState(false);
  var [showCatalog, setShowCatalog] = useState(true);

  // Load existing bill for edit
  useEffect(function () {
    if (existingBill) {
      setCustomer({ name: existingBill.customerName || '', email: existingBill.customerEmail || '', phone: existingBill.customerPhone || '' });
      setItems(existingBill.items || []);
      setDiscType(existingBill.discountType || 'none');
      setDiscVal(existingBill.discountValue || '');
      setTaxRate(existingBill.taxRate || 8.5);
      setNotes(existingBill.notes || '');
    }
  }, [existingBill]);

  var totals = calcTotals(items, discountType, discountValue, taxRate);

  var addItem = useCallback(function (item) {
    setItems(function (prev) {
      var idx = prev.findIndex(function (i) { return i.name === item.name && i.category === item.category && i.price === item.price; });
      if (idx >= 0 && item.category !== 'custom') {
        var updated = prev.slice();
        updated[idx] = Object.assign({}, updated[idx], { quantity: updated[idx].quantity + (item.quantity || 1) });
        return updated;
      }
      return [...prev, Object.assign({ id: Date.now() + Math.random() }, item)];
    });
    app.addToast(item.name + ' added to bill', 'success');
  }, [app]);

  var updateQty = function (id, qty) {
    var q = parseInt(qty);
    if (isNaN(q) || q < 1) return;
    setItems(function (prev) { return prev.map(function (i) { return i.id === id ? Object.assign({}, i, { quantity: q }) : i; }); });
  };

  var updatePrice = function (id, price) {
    var p = parseFloat(price);
    if (isNaN(p) || p < 0) return;
    setItems(function (prev) { return prev.map(function (i) { return i.id === id ? Object.assign({}, i, { price: p }) : i; }); });
  };

  var removeItem = function (id) {
    setItems(function (prev) { return prev.filter(function (i) { return i.id !== id; }); });
  };

  var handleCustomerChange = function (field, value) {
    setCustomer(function (prev) { return Object.assign({}, prev, { [field]: value }); });
  };

  var handleSave = async function (status) {
    if (!items.length) { app.addToast('Add at least one item', 'warning'); return; }
    setSaving(true);
    try {
      var payload = {
        customerName: customer.name, customerEmail: customer.email, customerPhone: customer.phone,
        items: items.map(function (i) { return ({ name: i.name, category: i.category, price: i.price, quantity: i.quantity }); }),
        discountType: discountType, discountValue: parseFloat(discountValue) || 0,
        taxRate: parseFloat(taxRate), notes: notes, status: status,
      };
      var res;
      if (existingBill) {
        res = await billApi.update(existingBill.id, payload);
      } else {
        res = await billApi.create(payload);
      }
      app.addToast('Bill saved successfully! ' + res.data.data.invoiceNumber, 'success');
      navigate('/bills/' + res.data.data.id);
    } catch (err) {
      app.addToast(err.message, 'danger');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: showCatalog ? '1fr 380px' : '1fr', gap: '1.5rem' }}>

      {/* ─── Left: Bill Form ─── */}
      <div>
        {/* Customer Info */}
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Customer Details
            </h3>
            <button className="btn btn-ghost btn-sm" onClick={function () { return setShowCatalog(function (s) { return !s; }); }}>
              {showCatalog ? '← Hide Catalog' : '+ Show Catalog'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 1rem' }}>
            <div className="form-group">
              <label className="form-label">Customer Name</label>
              <input type="text" className="form-input" placeholder="Full name" value={customer.name}
                onChange={function (e) { return handleCustomerChange('name', e.target.value); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="email@example.com" value={customer.email}
                onChange={function (e) { return handleCustomerChange('email', e.target.value); }} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" placeholder="+1-555-0000" value={customer.phone}
                onChange={function (e) { return handleCustomerChange('phone', e.target.value); }} />
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="card" style={{ marginBottom: '1.25rem', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Line Items ({items.length})
            </h3>
            {items.length > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={function () { return setItems([]); }} style={{ color: 'var(--rose)' }}>
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="empty-state" style={{ padding: '2.5rem' }}>
              <div className="empty-state-icon">📋</div>
              <h3>No items added</h3>
              <p>Click items from the catalog or use the custom tab to add items to this bill.</p>
            </div>
          ) : (
            <div>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: '0.5rem', padding: '0.6rem 0.9rem', background: 'rgba(255,107,53,0.05)', borderBottom: '1px solid var(--border-1)' }}>
                {['Item', 'Category', 'Unit Price', 'Qty', 'Total'].map(function (h) {
                  return (
                    <span key={h} style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {h}
                    </span>
                  );
                })}
              </div>

              {items.map(function (item) {
                return (
                  <div key={item.id} className="line-item">
                    {/* Name */}
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{item.name}</div>
                      {item.description && <div style={{ fontSize: '0.73rem', color: 'var(--text-3)' }}>{item.description}</div>}
                    </div>

                    {/* Category */}
                    <span className={'badge badge-' + item.category} style={{ fontSize: '0.60rem' }}>
                      {item.category}
                    </span>

                    {/* Price */}
                    <input
                      type="number" className="qty-input" style={{ width: '70px' }}
                      value={item.price} step="0.01" min="0"
                      onChange={function (e) { return updatePrice(item.id, e.target.value); }}
                    />

                    {/* Qty controls */}
                    <div className="qty-control">
                      <button className="qty-btn" onClick={function () { return updateQty(item.id, item.quantity - 1); }} disabled={item.quantity <= 1}>−</button>
                      <input type="number" className="qty-input" value={item.quantity} min="1"
                        onChange={function (e) { return updateQty(item.id, e.target.value); }} />
                      <button className="qty-btn" onClick={function () { return updateQty(item.id, item.quantity + 1); }}>+</button>
                    </div>

                    {/* Total + delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontWeight: '700', color: 'var(--orange)', minWidth: '60px', textAlign: 'right' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button className="btn-icon danger" onClick={function () { return removeItem(item.id); }} title="Remove">🗑</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Discount + Tax + Notes */}
        <div className="card" style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>
            Discount, Tax & Notes
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 1rem' }}>
            <div className="form-group">
              <label className="form-label">Discount Type</label>
              <select className="form-select" value={discountType} onChange={function (e) { return setDiscType(e.target.value); }}>
                <option value="none">No Discount</option>
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            {discountType !== 'none' && (
              <div className="form-group">
                <label className="form-label">{discountType === 'percentage' ? 'Discount %' : 'Discount $'}</label>
                <input type="number" className="form-input" placeholder="0" min="0"
                  value={discountValue} onChange={function (e) { return setDiscVal(e.target.value); }} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Tax Rate (%)</label>
              <select className="form-select" value={taxRate} onChange={function (e) { return setTaxRate(e.target.value); }}>
                {TAX_RATES.map(function (r) {
                  return <option key={r} value={r}>{r}%</option>;
                })}
              </select>
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Internal Notes</label>
            <input type="text" className="form-input" placeholder="Optional notes..."
              value={notes} onChange={function (e) { return setNotes(e.target.value); }} />
          </div>
        </div>

        {/* Totals */}
        <div className="totals-panel" style={{ marginBottom: '1.25rem' }}>
          <div className="totals-row"><span>Subtotal</span><span style={{ fontFamily: 'var(--mono)' }}>${totals.subtotal.toFixed(2)}</span></div>
          {discountType !== 'none' && totals.discountAmount > 0 && (
            <div className="totals-row" style={{ color: 'var(--emerald)' }}>
              <span>Discount {discountType === 'percentage' ? '(' + discountValue + '%)' : '(Fixed)'}</span>
              <span style={{ fontFamily: 'var(--mono)' }}>−${totals.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="totals-row"><span>Tax ({taxRate}%)</span><span style={{ fontFamily: 'var(--mono)' }}>${totals.taxAmount.toFixed(2)}</span></div>
          <div className="totals-row grand"><span>Total</span><span>${totals.total.toFixed(2)}</span></div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={function () { return handleSave('draft'); }} disabled={saving || !items.length}>
            {saving ? <><span className="spinner" /><span>Saving...</span></> : '💾 Save Draft'}
          </button>
          <button className="btn btn-success btn-lg" onClick={function () { return handleSave('paid'); }} disabled={saving || !items.length} style={{ flex: 1 }}>
            {saving ? <><span className="spinner" /><span>Processing...</span></> : '✓ Finalize & Mark Paid'}
          </button>
        </div>
      </div>

      {/* ─── Right: Catalog ─── */}
      {showCatalog && (
        <div>
          <div className="card" style={{ position: 'sticky', top: '1rem', maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>
              Product Catalog
            </h3>
            <CatalogPanel onAddItem={addItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BillBuilder;