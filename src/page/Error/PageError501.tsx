import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotImplementedError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-red-400 mb-4">
                Not Implemented
            </h1>
            <p className="text-xl font-medium text-gray-800 mb-2">501 - NOT IMPLEMENTED</p>
            <p className="text-lg text-gray-600 mb-8">
                The server does not support the functionality required to fulfill the request. Please try again later or contact support.
            </p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-md hover:from-blue-600 hover:via-green-600 hover:to-red-600"
            >
                GO TO HOMEPAGE
            </button>
        </div>
    );
}

export default NotImplementedError;
