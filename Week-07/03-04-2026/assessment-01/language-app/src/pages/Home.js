import React from "react";
import { Link } from "react-router-dom";
import { useLanguage, LANGUAGES } from "../context/LanguageContext";

const feats = [
  { t: "feat1_title", d: "feat1_desc", icon: "⚡", color: "pink"  },
  { t: "feat2_title", d: "feat2_desc", icon: "🔗", color: "mint"  },
  { t: "feat3_title", d: "feat3_desc", icon: "🌍", color: "sky"   },
  { t: "feat4_title", d: "feat4_desc", icon: "🔑", color: "lav"   },
];

const Home = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow hero-glow1" />
        <div className="hero-glow hero-glow2" />
        <div className="hero-glow hero-glow3" />

        <div className="hero-body">
          <div className="hero-badge">
            <span className="hb-dot" />
            {t("hero_badge")}
          </div>

          <h1 className="hero-h1">
            <span className="h1-line1">{t("hero_title")}</span>
            <br />
            <span className="h1-accent">{t("hero_title_accent")}</span>
          </h1>

          <p className="hero-p">{t("hero_subtitle")}</p>

          <div className="hero-btns">
            <Link to="/contact" className="btn-grad">{t("hero_cta_primary")}</Link>
            <Link to="/about" className="btn-glass">{t("hero_cta_secondary")}</Link>
          </div>

          {/* Language pill strip */}
          <div className="lang-strip">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`lang-pill ${language === lang.code ? "lp-active" : ""}`}
              >
                <span>{lang.flag}</span>
                <span className="lp-native">{lang.native}</span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { v: t("hero_stat1_val"), l: t("hero_stat1_label"), c: "pink" },
              { v: t("hero_stat2_val"), l: t("hero_stat2_label"), c: "mint" },
              { v: t("hero_stat3_val"), l: t("hero_stat3_label"), c: "sky"  },
            ].map((s) => (
              <div key={s.l} className={`hstat hstat-${s.c}`}>
                <span className="hstat-val">{s.v}</span>
                <span className="hstat-label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="feats">
        <div className="feats-inner">
          <div className="sec-head">
            <h2 className="sec-h2">{t("features_title")}</h2>
            <p className="sec-p">{t("features_sub")}</p>
          </div>
          <div className="feats-grid">
            {feats.map((f) => (
              <div key={f.t} className={`feat-card fc-${f.color}`}>
                <div className="fc-icon">{f.icon}</div>
                <h3 className="fc-title">{t(f.t)}</h3>
                <p className="fc-desc">{t(f.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how">
        <div className="how-inner">
          <div className="sec-head">
            <h2 className="sec-h2">How It Works</h2>
            <p className="sec-p">Three simple steps to global reach.</p>
          </div>
          <div className="how-steps">
            {[
              { n: "01", title: "Wrap with Provider", desc: "Wrap your app with LanguageProvider to inject the context globally.", color: "pink" },
              { n: "02", title: "Call useLanguage()", desc: "Any component calls useLanguage() to get the t() translate function.", color: "mint" },
              { n: "03", title: "Render t('key')", desc: "Use t('key') in your JSX — it returns the correct string for the active language.", color: "sky" },
            ].map((s) => (
              <div key={s.n} className={`how-step hs-${s.color}`}>
                <div className="hs-num">{s.n}</div>
                <h3 className="hs-title">{s.title}</h3>
                <p className="hs-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;