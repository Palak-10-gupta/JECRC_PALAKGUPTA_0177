// src/context/AppContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

var AppContext = createContext(null);

export var AppProvider = function ({ children }) {
  var [toasts, setToasts] = useState([]);
  var [activeBill, setActiveBill] = useState(null); // bill being edited in builder

  var addToast = useCallback(function (message, type) {
    if (!type) type = 'info';
    var id = Date.now() + Math.random();
    setToasts(function (prev) { return [...prev, { id: id, message: message, type: type }]; });
    setTimeout(function () {
      setToasts(function (prev) { return prev.filter(function (t) { return t.id !== id; }); });
    }, 3500);
  }, []);

  var removeToast = useCallback(function (id) {
    setToasts(function (prev) { return prev.filter(function (t) { return t.id !== id; }); });
  }, []);

  return (
    <AppContext.Provider value={{
      toasts: toasts,
      addToast: addToast,
      removeToast: removeToast,
      activeBill: activeBill,
      setActiveBill: setActiveBill,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export var useApp = function () {
  var ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};

export default AppContext;