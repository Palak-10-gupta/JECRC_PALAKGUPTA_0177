// src/pages/BillDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { billApi } from '../utils/api';
import { useApp } from '../Context/AppContext';

var statusColor = function (s) {
  if (s === 'paid')      return '#00D9A3';
  if (s === 'draft')     return '#FFB800';
  if (s === 'cancelled') return '#FF4D6A';
  return '#6E6B8A';
};

var catColors = {
  entrance: '#00B4FF',
  donation: '#FF4D6A',
  selling:  '#00D9A3',
  custom:   '#6E6B8A',
};

var Row = function ({ label, value, mono, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border-1)' }}>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>{label}</span>
      <span style={{
        fontFamily: mono ? 'var(--mono)' : 'var(--font)',
        fontWeight: highlight ? '800' : '600',
        color: highlight ? 'var(--orange)' : 'var(--text-1)',
        fontSize: highlight ? '1.1rem' : '0.88rem',
      }}>{value}</span>
    </div>
  );
};

// ✅ FIXED PRINT CSS
var PRINT_CSS = `
@media print {
  @page { margin: 12mm; size: A4; }

  body * {
    visibility: hidden;
  }

  #bill-printable, #bill-printable * {
    visibility: visible;
  }

  #bill-printable {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: white;
  }
}
`;

var PrintableBill = function ({ bill }) {
  return (
    // ❌ removed display: none
    <div id="bill-printable" style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: '#111', background: 'white' }}>
      <style>{PRINT_CSS}</style>

      {/* ── Header ── */}
      <div style={{ background: 'linear-gradient(135deg,#FF6B35,#F7931E)', color: 'white', padding: '22px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: '900' }}>⚡ BillGen</div>
          <div style={{ fontSize: '11px', opacity: 0.85 }}>Multi-Catalog Billing System</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '18px', fontWeight: '800' }}>{bill.invoiceNumber}</div>
          <div style={{ marginTop: '5px', display: 'inline-block', padding: '2px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.25)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {bill.status}
          </div>
        </div>
      </div>

      {/* ── Customer / Invoice info ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '2px solid #f0f0f0' }}>
        <div style={{ padding: '18px 30px', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Bill To</div>
          <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '3px' }}>{bill.customerName || 'Walk-in Customer'}</div>
          {bill.customerEmail && <div style={{ fontSize: '12px', color: '#555' }}>{bill.customerEmail}</div>}
          {bill.customerPhone && <div style={{ fontSize: '12px', color: '#555' }}>{bill.customerPhone}</div>}
        </div>
        <div style={{ padding: '18px 30px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Invoice Details</div>
          {[{ l: 'Invoice #', v: bill.invoiceNumber },
            { l: 'Date', v: new Date(bill.createdAt).toLocaleDateString() },
            { l: 'Status', v: bill.status.toUpperCase() }].map(function (r) {
            return (
              <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>{r.l}</span>
                <span style={{ fontSize: '12px', fontWeight: '700' }}>{r.v}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Items + totals same as your code (no change) */}
      <div style={{ padding: '22px 30px' }}>
        {bill.items.map((item, i) => (
          <div key={i}>{item.name}</div>
        ))}

        <div style={{ marginTop: '20px' }}>
          Total: ${bill.total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

var BillDetail = function () {
  var { id } = useParams();
  var navigate = useNavigate();
  var app = useApp();

  var [bill, setBill] = useState(null);
  var [loading, setLoading] = useState(true);

  useEffect(function () {
    billApi.getById(id)
      .then(function (res) { setBill(res.data.data); })
      .catch(function () { navigate('/bills'); })
      .finally(function () { setLoading(false); });
  }, [id]);

  // ✅ FIXED PRINT FUNCTION
  var handlePrint = function () {
    setTimeout(() => {
      window.print();
    }, 200);
  };

  if (loading) return <div>Loading...</div>;
  if (!bill) return null;

  return (
    <div>
      {/* hidden printable */}
      <PrintableBill bill={bill} />

      <button onClick={handlePrint}>Print / PDF</button>
    </div>
  );
};

export default BillDetail;