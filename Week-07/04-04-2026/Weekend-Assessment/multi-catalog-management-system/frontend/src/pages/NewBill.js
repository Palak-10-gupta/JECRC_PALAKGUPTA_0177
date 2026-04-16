// src/pages/NewBill.js
import React from 'react';
import BillBuilder from '../components/bill/BillBuilder';

var NewBill = function () {
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>
          ⚡ New Bill
        </h1>
        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>
          Select items from the catalog, set customer details, and save or finalize the bill.
        </p>
      </div>

      <BillBuilder />
    </div>
  );
};

export default NewBill;