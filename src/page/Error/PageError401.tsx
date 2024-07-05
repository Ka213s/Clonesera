import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">
                Unauthorized
            </h1>
            <p className="text-xl font-medium text-gray-800 mb-2">401 - UNAUTHORIZED</p>
            <p className="text-lg text-gray-600 mb-8">
                You do not have the necessary permissions to access this resource. Please check your credentials and try again.
            </p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600"
            >
                GO TO HOMEPAGE
            </button>
        </div>
    );
}

export default UnauthorizedError;
