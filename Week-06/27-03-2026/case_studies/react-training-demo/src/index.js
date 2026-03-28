import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // ✅ use this App only

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
const root1 = ReactDOM.createRoot(document.getElementById('root1'));
root1.render(<App />);