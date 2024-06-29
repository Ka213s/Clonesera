import React, { useEffect, useCallback } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

const handleLogout = (navigate: NavigateFunction): void => {
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    navigate('/login');
};

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const memoizedHandleLogout = useCallback(() => handleLogout(navigate), [navigate]);

    useEffect(() => {
        memoizedHandleLogout();
    }, [memoizedHandleLogout]);

    return null; // Return null to prevent rendering anything in the component
};

export default Logout;
