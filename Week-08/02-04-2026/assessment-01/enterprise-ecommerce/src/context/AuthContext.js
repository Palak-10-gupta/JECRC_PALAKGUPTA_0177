import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulate login — accept any credentials
    setUser({ name: "Alex Johnson", email, role: "Admin", avatar: "AJ" });
    return true;
  };

  const register = (name, email) => {
    setUser({ name, email, role: "User", avatar: name.slice(0, 2).toUpperCase() });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);