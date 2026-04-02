import React from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const values = [42, 58, 45, 70, 65, 88, 75, 92, 85, 110, 95, 128];
const maxVal = Math.max(...values);

const topProducts = [
  { name: "Enterprise Plan", sales: 842, revenue: "$841,158", pct: 92 },
  { name: "Pro Plan", sales: 1204, revenue: "$359,996", pct: 78 },
  { name: "Starter Kit", sales: 3891, revenue: "$190,659", pct: 61 },
  { name: "Add-on Pack", sales: 2210, revenue: "$174,590", pct: 55 },
];

const Analytics = () => (
  <div className="dash-page">
    <div className="dash-page-header">
      <div>
        <h1>Analytics</h1>
        <p>Track your store performance over time.</p>
      </div>
      <select className="period-select">
        <option>Last 12 months</option>
        <option>Last 30 days</option>
        <option>Last 7 days</option>
      </select>
    </div>

    {/* Bar Chart */}
    <div className="dash-card">
      <div className="dash-card-header">
        <h3>Revenue Overview</h3>
        <span className="chart-total">Total: $128,450</span>
      </div>
      <div className="bar-chart">
        {values.map((v, i) => (
          <div key={i} className="bar-col">
            <div className="bar-wrap">
              <div
                className="bar"
                style={{ height: `${(v / maxVal) * 180}px` }}
                title={`$${v}K`}
              />
            </div>
            <span className="bar-label">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Top Products */}
    <div className="dash-card">
      <div className="dash-card-header">
        <h3>Top Products</h3>
      </div>
      <div className="top-products">
        {topProducts.map((p) => (
          <div key={p.name} className="top-product-row">
            <div className="tp-info">
              <span className="tp-name">{p.name}</span>
              <span className="tp-sales">{p.sales} sales</span>
            </div>
            <div className="tp-bar-wrap">
              <div className="tp-bar" style={{ width: `${p.pct}%` }} />
            </div>
            <span className="tp-revenue">{p.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Analytics;