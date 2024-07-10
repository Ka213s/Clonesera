import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const memoizedHandleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  useEffect(() => {
    memoizedHandleLogout();
  }, [memoizedHandleLogout]);

  return null;
};

export default Logout;
