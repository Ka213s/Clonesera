import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom'; // Import NavigateFunction type

export const handleLogout = (navigate: NavigateFunction) => { // Specify NavigateFunction type for navigate
    localStorage.removeItem('userData');
    navigate('/login');
};

const Logout: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button onClick={() => handleLogout(navigate)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
            Logout
        </button>
    );
};

export default Logout;
