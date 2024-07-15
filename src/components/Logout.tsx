import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // Xóa token và userData khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Chuyển hướng về trang chủ
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
};

export default Logout;
