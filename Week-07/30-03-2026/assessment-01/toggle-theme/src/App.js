import React, { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="card">
        <h1>Theme Switcher</h1>

        <p className="mode-text">
          Mode: <span>{darkMode ? "Dark 🌙" : "Light ☀️"}</span>
        </p>

        <button onClick={toggleTheme} className="toggle-btn">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default App;