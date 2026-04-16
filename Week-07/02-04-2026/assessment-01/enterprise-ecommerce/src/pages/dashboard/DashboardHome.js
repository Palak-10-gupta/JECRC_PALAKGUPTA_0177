import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Revenue", value: "$128,450", change: "+12.5%", up: true, icon: "◎" },
  { label: "Orders Today", value: "1,284", change: "+8.2%", up: true, icon: "⊞" },
  { label: "Active Products", value: "3,842", change: "+3.1%", up: true, icon: "◈" },
  { label: "Avg Order Value", value: "$99.90", change: "-2.4%", up: false, icon: "⬡" },
];

const recentOrders = [
  { id: "#ORD-7291", customer: "Emma Watson", product: "Pro Plan", amount: "$299", status: "Completed" },
  { id: "#ORD-7290", customer: "James Miller", product: "Starter Kit", amount: "$49", status: "Processing" },
  { id: "#ORD-7289", customer: "Sofia Garcia", product: "Enterprise", amount: "$999", status: "Completed" },
  { id: "#ORD-7288", customer: "Noah Brown", product: "Pro Plan", amount: "$299", status: "Pending" },
  { id: "#ORD-7287", customer: "Olivia Davis", product: "Add-on Pack", amount: "$79", status: "Completed" },
];

const statusColor = { Completed: "status-green", Processing: "status-blue", Pending: "status-amber" };

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div>
          <h1>Good morning, {user?.name?.split(" ")[0]} 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
        <Link to="/products" className="btn-primary">View Products</Link>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-top">
              <span className="stat-icon">{s.icon}</span>
              <span className={`stat-change ${s.up ? "change-up" : "change-down"}`}>
                {s.change}
              </span>
            </div>
            <p className="stat-value">{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h3>Recent Orders</h3>
          <span className="view-all">View all →</span>
        </div>
        <div className="table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td className="order-amount">{o.amount}</td>
                  <td><span className={`status-badge ${statusColor[o.status]}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;