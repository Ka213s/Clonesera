import React, { useEffect } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

export const handleLogout = (navigate: NavigateFunction) => {
    localStorage.removeItem('userData');
    navigate('/login');
};

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout(navigate);
    }, []);

    return null; // Return null to prevent rendering anything in the component
};

export default Logout;
