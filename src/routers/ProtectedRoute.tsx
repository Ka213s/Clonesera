import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: (string | number)[];
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const userData = localStorage.getItem('userData');
  let userRole: number | null = null;

  if (userData) {
    try {
      const parsedUserData = JSON.parse(userData);
      userRole = parsedUserData.roleId;
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }

  if (userRole === null || !allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
