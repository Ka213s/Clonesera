import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToLoginIfNoUserData = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/');
        }
    }, [navigate]);

    return null;
};

export default RedirectToLoginIfNoUserData;
