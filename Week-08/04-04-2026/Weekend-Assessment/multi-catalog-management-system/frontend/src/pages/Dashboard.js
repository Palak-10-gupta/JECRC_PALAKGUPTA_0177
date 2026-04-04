// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { billApi } from '../utils/api';
import { useApp } from '../Context/AppContext';

var StatCard = function ({ label, value, sub, icon, color }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: 'var(--r-md)',
        background: (color || 'var(--grad-brand)'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.4rem', flexShrink: 0,
        boxShadow: '0 4px 16px rgba(255,107,53,0.25)',
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>{label}</div>
        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-1)', fontFamily: 'var(--mono)', lineHeight: 1.1, marginTop: '2px' }}>{value}</div>
        {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '3px' }}>{sub}</div>}
      </div>
    </div>
  );
};

var Dashboard = function () {
  var app = useApp();
  var [summary, setSummary]   = useState(null);
  var [allBills, setAllBills] = useState([]);
  var [loading, setLoading]   = useState(true);

  useEffect(function () {
    Promise.all([
      billApi.summary(),
      billApi.getAll({ sortBy: 'createdAt', order: 'desc' }),
    ])
      .then(function (results) {
        setSummary(results[0].data.data);
        setAllBills(results[1].data.data || []);
      })
      .catch(function (err) {
        app.addToast('Failed to load dashboard: ' + err.message, 'danger');
      })
      .finally(function () { setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="loading-center" style={{ height: '60vh' }}>
        <span className="spinner-lg spinner" />
        <span style={{ color: 'var(--text-3)' }}>Loading dashboard...</span>
      </div>
    );
  }

  var totalBills   = allBills.length;
  var paidBills    = allBills.filter(function (b) { return b.status === 'paid'; });
  var draftBills   = allBills.filter(function (b) { return b.status === 'draft'; });
  var totalRevenue = paidBills.reduce(function (s, b) { return s + b.total; }, 0);

  var recentBills = allBills.slice(0, 5);

  var statusColor = function (s) {
    if (s === 'paid')      return 'var(--emerald)';
    if (s === 'draft')     return 'var(--gold)';
    if (s === 'cancelled') return 'var(--rose)';
    return 'var(--text-3)';
  };

  var categorySales = summary && summary.categorySales ? summary.categorySales : {};
  var catEntries    = Object.entries(categorySales);
  var maxCat        = catEntries.length ? Math.max.apply(null, catEntries.map(function (e) { return e[1]; })) : 1;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '4px' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>
            Welcome back — here's what's happening today.
          </p>
        </div>
        <Link to="/bills/new" className="btn btn-primary">
          ⚡ New Bill
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <StatCard
          label="Total Revenue"
          value={'$' + totalRevenue.toFixed(2)}
          sub={paidBills.length + ' paid bills'}
          icon="💰"
          color="var(--grad-brand)"
        />
        <StatCard
          label="Total Bills"
          value={totalBills}
          sub="all time"
          icon="📋"
          color="linear-gradient(135deg,#00B4FF,#00D9A3)"
        />
        <StatCard
          label="Draft Bills"
          value={draftBills.length}
          sub="awaiting finalisation"
          icon="📝"
          color="linear-gradient(135deg,#FFB800,#FF6B35)"
        />
        <StatCard
          label="Today's Revenue"
          value={'$' + (summary ? summary.totalRevenue.toFixed(2) : '0.00')}
          sub={'Tax: $' + (summary ? summary.totalTax.toFixed(2) : '0.00')}
          icon="📅"
          color="linear-gradient(135deg,#FF4D6A,#c0392b)"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem', alignItems: 'start' }}>

        {/* Recent Bills */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Recent Bills
            </h2>
            <Link to="/bills" style={{ fontSize: '0.78rem', color: 'var(--orange)', fontWeight: '600' }}>
              View All →
            </Link>
          </div>

          {recentBills.length === 0 ? (
            <div className="empty-state" style={{ padding: '2.5rem' }}>
              <div className="empty-state-icon">📋</div>
              <h3>No bills yet</h3>
              <p>Create your first bill to get started.</p>
              <Link to="/bills/new" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
                Create Bill
              </Link>
            </div>
          ) : (
            <div>
              {recentBills.map(function (bill) {
                return (
                  <Link key={bill.id} to={'/bills/' + bill.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--border-1)',
                    textDecoration: 'none', transition: 'background 0.15s',
                  }}
                    onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(255,107,53,0.04)'; }}
                    onMouseLeave={function (e) { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--text-1)', marginBottom: '2px' }}>
                        {bill.invoiceNumber}
                      </div>
                      <div style={{ fontSize: '0.77rem', color: 'var(--text-3)' }}>
                        {bill.customerName || 'Walk-in Customer'}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontWeight: '700', color: 'var(--orange)', fontSize: '0.9rem' }}>
                        ${bill.total.toFixed(2)}
                      </div>
                      <span style={{
                        fontSize: '0.65rem', padding: '2px 8px', borderRadius: 'var(--r-full)',
                        background: statusColor(bill.status) + '22',
                        border: '1px solid ' + statusColor(bill.status) + '44',
                        color: statusColor(bill.status), fontWeight: '700', textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        {bill.status}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Category Sales */}
          <div className="card">
            <h2 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1.1rem' }}>
              Today's Category Sales
            </h2>
            {catEntries.length === 0 ? (
              <p style={{ color: 'var(--text-3)', fontSize: '0.82rem' }}>No sales recorded today.</p>
            ) : (
              catEntries.map(function (entry) {
                var cat = entry[0]; var val = entry[1];
                var pct = maxCat ? Math.round((val / maxCat) * 100) : 0;
                return (
                  <div key={cat} style={{ marginBottom: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-2)', textTransform: 'capitalize', fontWeight: '600' }}>{cat}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--orange)' }}>${val.toFixed(2)}</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-3)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: pct + '%', background: 'var(--grad-brand)', borderRadius: 'var(--r-full)', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Top Items */}
          {summary && summary.topItems && summary.topItems.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1.1rem' }}>
                Top Items Today
              </h2>
              {summary.topItems.map(function (item, idx) {
                return (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.7rem' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: 'var(--r-sm)',
                      background: idx === 0 ? 'var(--grad-brand)' : 'var(--bg-3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: '800', color: idx === 0 ? 'white' : 'var(--text-3)',
                      flexShrink: 0,
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-1)' }}>{item.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>qty: {item.quantity}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.82rem', color: 'var(--orange)', fontWeight: '700' }}>
                      ${item.revenue.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick links */}
          <div className="card">
            <h2 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/bills/new" className="btn btn-primary btn-sm">⚡ Create New Bill</Link>
              <Link to="/bills" className="btn btn-secondary btn-sm">📋 View All Bills</Link>
              <Link to="/catalogs" className="btn btn-ghost btn-sm">📦 Manage Catalogs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;