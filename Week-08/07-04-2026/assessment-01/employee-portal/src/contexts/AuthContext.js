import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

const MOCK_USERS = [
  { id: 1, email: 'admin@portal.com', password: 'admin123', name: 'Palak Gupta', role: 'Admin', avatar: '👩‍💼' },
  { id: 2, email: 'user@portal.com',  password: 'user123',  name: 'Sam Rivera',   role: 'Employee', avatar: '👨‍💻' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('ep_user');
    return s ? JSON.parse(s) : null;
  });
  const [authError, setAuthError] = useState('');
  const [loading, setLoading]     = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setAuthError('');
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _p, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('ep_user', JSON.stringify(safeUser));
      setLoading(false);
      return true;
    }
    setAuthError('Invalid email or password.');
    setLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ep_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, authError, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};