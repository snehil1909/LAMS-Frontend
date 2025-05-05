import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
if (!user || !user.userId) {
  return <Navigate to="/" state={{ from: location }} replace />;
}
if (allowedRoles && !allowedRoles.includes(user.role)) {
  return <Navigate to="/unauthorized" replace />;
}

  return children;
};

export default ProtectedRoute;