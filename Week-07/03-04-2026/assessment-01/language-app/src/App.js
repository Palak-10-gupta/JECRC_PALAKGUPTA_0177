import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";

const AppContent = () => {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <div className="af-inner">
          <div className="af-brand">
            <span className="af-logo">🌐</span>
            <span className="af-name">LinguaX</span>
          </div>
          <p className="af-tagline">{t("footer_tagline")}</p>
          <p className="af-copy">{t("footer_copy")}</p>
        </div>
      </footer>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;