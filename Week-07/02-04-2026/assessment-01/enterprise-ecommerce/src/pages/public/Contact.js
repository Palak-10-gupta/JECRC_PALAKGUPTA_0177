import React, { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="contact-card">
            <span className="contact-icon">✉</span>
            <h4>Email</h4>
            <p>hello@nexashop.io</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">◎</span>
            <h4>Support</h4>
            <p>support@nexashop.io</p>
          </div>
          <div className="contact-card">
            <span className="contact-icon">⊕</span>
            <h4>Office</h4>
            <p>100 Commerce Ave, San Francisco, CA</p>
          </div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" required
                  value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="Tell us more..." required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="btn-primary full-width">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;