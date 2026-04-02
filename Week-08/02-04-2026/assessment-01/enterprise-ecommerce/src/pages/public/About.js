import React from "react";

const team = [
  { name: "Sarah Chen", role: "CEO & Founder", avatar: "SC" },
  { name: "Marcus Reid", role: "CTO", avatar: "MR" },
  { name: "Priya Nair", role: "Head of Design", avatar: "PN" },
  { name: "Luca Ferri", role: "Lead Engineer", avatar: "LF" },
];

const About = () => (
  <div className="page-wrapper">
    <div className="page-hero">
      <h1>About NexaShop</h1>
      <p>We're building the most powerful commerce infrastructure on the planet.</p>
    </div>

    <div className="about-mission">
      <div className="mission-text">
        <h2>Our Mission</h2>
        <p>
          Founded in 2020, NexaShop was built on a simple belief — that enterprise-grade tools
          shouldn't require enterprise-sized budgets. We empower businesses of all sizes with
          the same technology used by the world's largest retailers.
        </p>
        <p>
          Our platform processes over 2 million orders monthly and supports merchants in more
          than 80 countries.
        </p>
      </div>
      <div className="mission-stats">
        <div className="mstat"><span>80+</span><p>Countries</p></div>
        <div className="mstat"><span>2M+</span><p>Orders/Month</p></div>
        <div className="mstat"><span>500+</span><p>Enterprise Clients</p></div>
        <div className="mstat"><span>99.9%</span><p>Uptime SLA</p></div>
      </div>
    </div>

    <div className="team-section">
      <h2 className="section-title">Meet the Team</h2>
      <div className="team-grid">
        {team.map((m) => (
          <div key={m.name} className="team-card">
            <div className="team-avatar">{m.avatar}</div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default About;