// src/pages/BillList.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { billApi } from '../utils/api';
import { useApp } from '../Context/AppContext';

var STATUS_OPTIONS = ['', 'draft', 'paid', 'cancelled'];

var statusColor = function (s) {
  if (s === 'paid')      return 'var(--emerald)';
  if (s === 'draft')     return 'var(--gold)';
  if (s === 'cancelled') return 'var(--rose)';
  return 'var(--text-3)';
};

// ─── CSV Export helper ────────────────────────────────────────────────────────
function exportToCSV(bills) {
  if (!bills || bills.length === 0) return;

  var escapeCell = function (val) {
    var str = val === null || val === undefined ? '' : String(val);
    // Wrap in quotes if contains comma, quote, or newline
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  };

  var headers = [
    'Invoice Number', 'Status', 'Customer Name', 'Customer Email', 'Customer Phone',
    'Items Count', 'Subtotal', 'Discount Type', 'Discount Value', 'Discount Amount',
    'Tax Rate (%)', 'Tax Amount', 'Total', 'Notes', 'Created At',
  ];

  var rows = bills.map(function (b) {
    return [
      b.invoiceNumber,
      b.status,
      b.customerName || '',
      b.customerEmail || '',
      b.customerPhone || '',
      b.items.length,
      b.subtotal.toFixed(2),
      b.discountType,
      b.discountValue,
      b.discountAmount.toFixed(2),
      b.taxRate,
      b.taxAmount.toFixed(2),
      b.total.toFixed(2),
      b.notes || '',
      new Date(b.createdAt).toLocaleString(),
    ].map(escapeCell).join(',');
  });

  var csvContent = [headers.join(',')].concat(rows).join('\n');
  var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  var date = new Date().toISOString().slice(0, 10);
  a.href     = url;
  a.download = 'bills-export-' + date + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Component ────────────────────────────────────────────────────────────────
var BillList = function () {
  var app      = useApp();
  var navigate = useNavigate();

  var [bills, setBills]       = useState([]);
  var [loading, setLoading]   = useState(true);
  var [filters, setFilters]   = useState({ status: '', search: '', startDate: '', endDate: '' });
  var [sortBy, setSortBy]     = useState('createdAt');
  var [order, setOrder]       = useState('desc');
  var [deleting, setDeleting] = useState(null);

  var fetchBills = useCallback(function () {
    setLoading(true);
    var params = Object.assign({}, filters, { sortBy: sortBy, order: order });
    Object.keys(params).forEach(function (k) { if (!params[k]) delete params[k]; });
    billApi.getAll(params)
      .then(function (res) { setBills(res.data.data || []); })
      .catch(function (err) { app.addToast(err.message, 'danger'); })
      .finally(function () { setLoading(false); });
  }, [filters, sortBy, order]);

  useEffect(function () { fetchBills(); }, [fetchBills]);

  var handleFilterChange = function (key, val) {
    setFilters(function (prev) { return Object.assign({}, prev, { [key]: val }); });
  };

  var handleDelete = async function (id, invoiceNum) {
    if (!window.confirm('Delete bill ' + invoiceNum + '? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await billApi.remove(id);
      app.addToast('Bill deleted', 'success');
      fetchBills();
    } catch (err) {
      app.addToast(err.message, 'danger');
    } finally {
      setDeleting(null);
    }
  };

  var handleStatusChange = async function (id, newStatus) {
    try {
      await billApi.setStatus(id, newStatus);
      app.addToast('Status updated to ' + newStatus, 'success');
      fetchBills();
    } catch (err) {
      app.addToast(err.message, 'danger');
    }
  };

  var toggleSort = function (field) {
    if (sortBy === field) {
      setOrder(function (prev) { return prev === 'asc' ? 'desc' : 'asc'; });
    } else {
      setSortBy(field);
      setOrder('desc');
    }
  };

  var handleExportCSV = function () {
    if (!bills.length) { app.addToast('No bills to export', 'warning'); return; }
    exportToCSV(bills);
    app.addToast(bills.length + ' bill(s) exported to CSV', 'success');
  };

  var SortIcon = function ({ field }) {
    if (sortBy !== field) return <span style={{ color: 'var(--text-4)', marginLeft: '4px' }}>↕</span>;
    return <span style={{ color: 'var(--orange)', marginLeft: '4px' }}>{order === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>📋 All Bills</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>
            {loading ? 'Loading...' : bills.length + ' bill(s) found'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {/* CSV Export button */}
          <button
            className="btn btn-secondary"
            onClick={handleExportCSV}
            disabled={loading || !bills.length}
            title="Export current view to CSV"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            📥 Export CSV
          </button>
          <Link to="/bills/new" className="btn btn-primary">⚡ New Bill</Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem 1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Search</label>
            <input type="text" className="form-input" placeholder="Invoice # or customer..."
              value={filters.search}
              onChange={function (e) { return handleFilterChange('search', e.target.value); }} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Status</label>
            <select className="form-select" value={filters.status}
              onChange={function (e) { return handleFilterChange('status', e.target.value); }}>
              {STATUS_OPTIONS.map(function (s) {
                return <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>;
              })}
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">From Date</label>
            <input type="date" className="form-input" value={filters.startDate}
              onChange={function (e) { return handleFilterChange('startDate', e.target.value); }} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">To Date</label>
            <input type="date" className="form-input" value={filters.endDate}
              onChange={function (e) { return handleFilterChange('endDate', e.target.value); }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn btn-ghost btn-sm" onClick={function () {
              setFilters({ status: '', search: '', startDate: '', endDate: '' });
            }}>Clear Filters</button>
          </div>
        </div>

        {/* Export hint row */}
        {bills.length > 0 && !loading && (
          <div style={{ marginTop: '0.9rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>
              💡 Tip: Filters apply to CSV export too — filter first, then export.
            </span>
            <button className="btn btn-ghost btn-sm" onClick={handleExportCSV} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem' }}>
              📥 Export {bills.length} bill{bills.length !== 1 ? 's' : ''} as CSV
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-center" style={{ padding: '3rem' }}>
            <span className="spinner-lg spinner" />
            <span style={{ color: 'var(--text-3)' }}>Loading bills...</span>
          </div>
        ) : bills.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem' }}>
            <div className="empty-state-icon">📋</div>
            <h3>No bills found</h3>
            <p>Try adjusting your filters or create a new bill.</p>
            <Link to="/bills/new" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>Create Bill</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,107,53,0.05)', borderBottom: '1px solid var(--border-1)' }}>
                  {[
                    { label: 'Invoice #',  field: 'invoiceNumber' },
                    { label: 'Customer',   field: 'customerName'  },
                    { label: 'Items',      field: null             },
                    { label: 'Total',      field: 'total'          },
                    { label: 'Status',     field: null             },
                    { label: 'Date',       field: 'createdAt'      },
                    { label: 'Actions',    field: null             },
                  ].map(function (col) {
                    return (
                      <th key={col.label}
                        onClick={col.field ? function () { return toggleSort(col.field); } : undefined}
                        style={{ padding: '0.7rem 1rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: col.field ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap' }}>
                        {col.label}
                        {col.field && <SortIcon field={col.field} />}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {bills.map(function (bill) {
                  return (
                    <tr key={bill.id} style={{ borderBottom: '1px solid var(--border-1)' }}
                      onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(255,107,53,0.03)'; }}
                      onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent'; }}>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <Link to={'/bills/' + bill.id} style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--orange)' }}>
                          {bill.invoiceNumber}
                        </Link>
                      </td>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>
                          {bill.customerName || <span style={{ color: 'var(--text-3)' }}>Walk-in</span>}
                        </div>
                        {bill.customerEmail && <div style={{ fontSize: '0.73rem', color: 'var(--text-3)' }}>{bill.customerEmail}</div>}
                      </td>

                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', color: 'var(--text-3)' }}>
                        {bill.items.length} item{bill.items.length !== 1 ? 's' : ''}
                      </td>

                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--mono)', fontWeight: '700', color: 'var(--orange)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                        ${bill.total.toFixed(2)}
                      </td>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <select
                          value={bill.status}
                          onChange={function (e) { return handleStatusChange(bill.id, e.target.value); }}
                          style={{ background: statusColor(bill.status) + '22', border: '1px solid ' + statusColor(bill.status) + '44', color: statusColor(bill.status), padding: '3px 8px', borderRadius: 'var(--r-full)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer', outline: 'none' }}>
                          <option value="draft">Draft</option>
                          <option value="paid">Paid</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.78rem', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                        {new Date(bill.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>

                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button className="btn-icon" title="View"   onClick={function () { return navigate('/bills/' + bill.id); }}>👁</button>
                          <button className="btn-icon" title="Edit"   onClick={function () { return navigate('/bills/' + bill.id + '/edit'); }}>✏️</button>
                          <button className="btn-icon" title="Print/PDF" onClick={function () { return navigate('/bills/' + bill.id); }}>🖨️</button>
                          <button className="btn-icon danger" title="Delete" disabled={deleting === bill.id}
                            onClick={function () { return handleDelete(bill.id, bill.invoiceNumber); }}>
                            {deleting === bill.id ? '…' : '🗑'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillList;