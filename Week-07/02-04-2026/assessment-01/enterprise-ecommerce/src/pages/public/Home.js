import React from "react";
import { Link } from "react-router-dom";

const features = [
  { icon: "◈", title: "Smart Inventory", desc: "Real-time stock tracking with AI-powered restocking alerts." },
  { icon: "◎", title: "Deep Analytics", desc: "Understand your customers with rich behavioral insights." },
  { icon: "⊞", title: "Role Management", desc: "Granular permission controls across your entire team." },
  { icon: "⬡", title: "Global Scale", desc: "Deploy to 50+ regions with sub-100ms response times." },
];

const Home = () => (
  <div className="home-page">
    {/* Hero */}
    <section className="hero">
      <div className="hero-badge">Enterprise Ready ✦</div>
      <h1 className="hero-title">
        The future of<br />
        <span className="gradient-text">e-commerce</span><br />
        is here.
      </h1>
      <p className="hero-sub">
        NexaShop gives your team the tools to build, scale, and manage a world-class online store.
      </p>
      <div className="hero-actions">
        <Link to="/register" className="btn-primary">Start Free Trial</Link>
        <Link to="/products" className="btn-ghost">Browse Products →</Link>
      </div>
      <div className="hero-grid-bg" />
    </section>

    {/* Features */}
    <section className="features-section">
      <h2 className="section-title">Everything you need</h2>
      <p className="section-sub">One platform. Unlimited possibilities.</p>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <h2>Ready to transform your business?</h2>
      <p>Join thousands of companies already using NexaShop.</p>
      <Link to="/register" className="btn-primary">Get Started Free</Link>
    </section>
  </div>
);

export default Home;