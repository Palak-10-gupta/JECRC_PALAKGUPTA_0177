// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import NewBill from './pages/NewBill';
import BillList from './pages/BillList';
import BillDetail from './pages/BillDetail';
import CatalogManager from './pages/CatalogManager';
import BillBuilder from './components/bill/BillBuilder';
import './styles/global.css';

// Edit bill wrapper — loads the bill then passes it to BillBuilder
import { useParams, useNavigate } from 'react-router-dom';
import { billApi } from './utils/api';
import { useApp } from './Context/AppContext';
import { useEffect, useState } from 'react';

var EditBillPage = function () {
  var { id }     = useParams();
  var navigate   = useNavigate();
  var app        = useApp();
  var [bill, setBill]     = useState(null);
  var [loading, setLoading] = useState(true);

  useEffect(function () {
    billApi.getById(id)
      .then(function (res) { setBill(res.data.data); })
      .catch(function (err) {
        app.addToast(err.message, 'danger');
        navigate('/bills');
      })
      .finally(function () { setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-center" style={{ height: '60vh' }}>
        <span className="spinner-lg spinner" />
        <span style={{ color: 'var(--text-3)' }}>Loading bill...</span>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>✏️ Edit Bill</h1>
        <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>
          Editing {bill && bill.invoiceNumber}
        </p>
      </div>
      {bill && <BillBuilder existingBill={bill} />}
    </div>
  );
};

var App = function () {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/"              element={<Dashboard />} />
            <Route path="/bills/new"     element={<NewBill />} />
            <Route path="/bills"         element={<BillList />} />
            <Route path="/bills/:id"     element={<BillDetail />} />
            <Route path="/bills/:id/edit" element={<EditBillPage />} />
            <Route path="/catalogs"      element={<CatalogManager />} />
            <Route path="*"              element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;