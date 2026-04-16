import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage, currentLang, LANGUAGES } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="ls-wrap">
      <button className="ls-trigger" onClick={() => setOpen(!open)}>
        <span className="ls-flag">{currentLang?.flag}</span>
        <span className="ls-native">{currentLang?.native}</span>
        <svg className={`ls-arrow ${open ? "ls-arrow-open" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="ls-backdrop" onClick={() => setOpen(false)} />
          <div className="ls-panel">
            <div className="ls-panel-header">
              <span className="ls-globe">🌐</span>
              <span>Select Language</span>
            </div>
            <div className="ls-list">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  className={`ls-item ${language === lang.code ? "ls-item-active" : ""}`}
                  onClick={() => { setLanguage(lang.code); setOpen(false); }}
                >
                  <span className="ls-item-flag">{lang.flag}</span>
                  <div className="ls-item-text">
                    <span className="ls-item-native">{lang.native}</span>
                    <span className="ls-item-label">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <span className="ls-item-tick">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;