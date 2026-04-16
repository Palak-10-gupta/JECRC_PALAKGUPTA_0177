import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  const infos = [
    { t:"contact_info1_title", v:"contact_info1_val", icon:"✉️", c:"pink" },
    { t:"contact_info2_title", v:"contact_info2_val", icon:"📍", c:"mint" },
    { t:"contact_info3_title", v:"contact_info3_val", icon:"⏱️", c:"sky"  },
  ];

  return (
    <div className="contact-page">
      <div className="pg-container">

        <div className="pg-hero">
          <span className="pg-badge">{t("contact_badge")}</span>
          <h1 className="pg-title">{t("contact_title")}</h1>
          <p className="pg-sub">{t("contact_sub")}</p>
        </div>

        <div className="contact-layout">
          <div className="ci-col">
            {infos.map((info) => (
              <div key={info.t} className={`ci-card ci-${info.c}`}>
                <span className="ci-icon">{info.icon}</span>
                <div>
                  <p className="ci-title">{t(info.t)}</p>
                  <p className="ci-val">{t(info.v)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cf-card">
            {sent ? (
              <div className="sent-wrap">
                <div className="sent-ring">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16l8 8 12-12" stroke="#4dd9ac" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{t("contact_sent_title")}</h3>
                <p>{t("contact_sent_sub")}</p>
                <button className="btn-glass-dark" onClick={() => setSent(false)}>← Back</button>
              </div>
            ) : (
              <form className="cf" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="cf-row">
                  <div className="cf-grp">
                    <label>{t("contact_name")}</label>
                    <input type="text" required placeholder={t("contact_name")}
                      value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="cf-grp">
                    <label>{t("contact_email")}</label>
                    <input type="email" required placeholder={t("contact_email")}
                      value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="cf-grp">
                  <label>{t("contact_subject")}</label>
                  <input type="text" required placeholder={t("contact_subject")}
                    value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
                </div>
                <div className="cf-grp">
                  <label>{t("contact_message")}</label>
                  <textarea rows={5} required placeholder={t("contact_message")}
                    value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
                </div>
                <button type="submit" className="btn-grad full-w">{t("contact_send")}</button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;