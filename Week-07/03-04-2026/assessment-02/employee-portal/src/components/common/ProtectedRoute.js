import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute
 * - Redirects unauthenticated users to /login
 * - Redirects non-admin users to /dashboard when adminOnly=true
 */
var ProtectedRoute = function ({ children, adminOnly }) {
  var auth = useAuth();
  var currentUser = auth.currentUser;
  var isAdmin = auth.isAdmin;
  var location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

ProtectedRoute.defaultProps = {
  adminOnly: false,
};

export default ProtectedRoute;