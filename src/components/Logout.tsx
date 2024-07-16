import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
};

export default Logout;
