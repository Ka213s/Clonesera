import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ allowedRoles: string[], children: JSX.Element }> = ({ allowedRoles, children }) => {
  const data = localStorage.getItem('data');
  let userRole: string | null = null;

  if (data) {
    try {
      const parsedData = JSON.parse(data);
      userRole = parsedData.role; // Assuming role is a string like 'student' or 'instructor'
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  }

  if (userRole === null || !allowedRoles.includes(userRole)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
