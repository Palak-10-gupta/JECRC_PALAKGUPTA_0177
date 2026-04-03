import React from "react";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const techs = [
    { k: "about_t1", icon: "⚛️", c: "sky"  },
    { k: "about_t2", icon: "🔗", c: "lav"  },
    { k: "about_t3", icon: "🛣️", c: "mint" },
    { k: "about_t4", icon: "🎨", c: "pink" },
  ];

  return (
    <div className="about-page">
      <div className="pg-container">

        <div className="pg-hero">
          <span className="pg-badge">{t("about_badge")}</span>
          <h1 className="pg-title">{t("about_title")}</h1>
        </div>

        <div className="about-grid">
          {/* Left — text */}
          <div className="about-text-col">
            {[t("about_p1"), t("about_p2"), t("about_p3")].map((p, i) => (
              <div key={i} className="about-p-card">{p}</div>
            ))}
          </div>

          {/* Right — cards */}
          <div className="about-side-col">
            <div className="side-card">
              <h3 className="sc-title">{t("about_tech_title")}</h3>
              <div className="tech-chips">
                {techs.map((tc) => (
                  <span key={tc.k} className={`tech-chip tc-${tc.c}`}>
                    {tc.icon} {t(tc.k)}
                  </span>
                ))}
              </div>
            </div>
            <div className="side-card sc-mission">
              <h3 className="sc-title">{t("about_mission_title")}</h3>
              <p className="sc-text">{t("about_mission_text")}</p>
            </div>
          </div>
        </div>

        {/* Context Diagram */}
        <div className="ctx-diagram">
          <p className="ctx-label">⚛ React Context API — Data Flow</p>
          <div className="ctx-flow">
            <div className="ctx-box ctx-provider">
              <span className="ctx-box-tag">Provider</span>
              <span className="ctx-box-name">LanguageProvider</span>
              <span className="ctx-box-sub">language, setLanguage, t()</span>
            </div>
            <div className="ctx-arrows">
              {["Navbar","Home","About","Contact"].map((c, i) => (
                <div key={c} className="ctx-arrow-row">
                  <div className="ctx-line" />
                  <div className={`ctx-consumer ctx-c${i}`}>{c}</div>
                </div>
              ))}
            </div>
            <div className="ctx-box ctx-hook">
              <span className="ctx-box-tag">Hook</span>
              <span className="ctx-box-name" style={{fontFamily:"monospace"}}>useLanguage()</span>
              <span className="ctx-box-sub">Access anywhere, no prop drilling</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;