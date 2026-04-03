import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/* ── Hardcoded in-memory users ── */
const USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Palak Gupta',
    email: 'admin@nexcorp.com',
    department: 'Management',
    position: 'HR Administrator',
    phone: '+1 (555) 001-0000',
    joinDate: '2020-01-15',
    salary: 120000,
    status: 'active',
    avatar: 'AS',
    avatarColor: 'avatar-purple',
  },
  {
    id: 2,
    username: 'john',
    password: 'john123',
    role: 'employee',
    name: 'John Mercer',
    email: 'john@nexcorp.com',
    department: 'Engineering',
    position: 'Senior Developer',
    phone: '+1 (555) 002-0011',
    joinDate: '2021-06-10',
    salary: 95000,
    status: 'active',
    avatar: 'JM',
    avatarColor: 'avatar-teal',
  },
  {
    id: 3,
    username: 'sara',
    password: 'sara123',
    role: 'employee',
    name: 'Sara Okonkwo',
    email: 'sara@nexcorp.com',
    department: 'Design',
    position: 'UX Designer',
    phone: '+1 (555) 003-0022',
    joinDate: '2022-03-01',
    salary: 88000,
    status: 'active',
    avatar: 'SO',
    avatarColor: 'avatar-pink',
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(function () {
    try {
      var stored = sessionStorage.getItem('nexcorp_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /* ── LOGIN ── */
  const login = useCallback(async function (username, password) {
    setIsLoading(true);
    setAuthError('');

    // Simulate network latency
    await new Promise(function (resolve) { return setTimeout(resolve, 900); });

    var found = USERS.find(function (u) {
      return u.username === username.trim().toLowerCase() && u.password === password;
    });

    if (found) {
      var safeUser = Object.assign({}, found);
      delete safeUser.password;
      setCurrentUser(safeUser);
      sessionStorage.setItem('nexcorp_user', JSON.stringify(safeUser));
      setIsLoading(false);
      return { success: true, user: safeUser };
    } else {
      setAuthError('Invalid username or password. Please try again.');
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  /* ── LOGOUT ── */
  const logout = useCallback(function () {
    setCurrentUser(null);
    sessionStorage.removeItem('nexcorp_user');
  }, []);

  var isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
        authError: authError,
        setAuthError: setAuthError,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = function () {
  var ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;