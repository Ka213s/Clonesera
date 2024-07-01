import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatedError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-4">
                Created
            </h1>
            <p className="text-xl font-medium text-gray-800 mb-2">201 - CREATED</p>
            <p className="text-lg text-gray-600 mb-8">
                The request has been fulfilled, resulting in the creation of a new resource.
            </p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                GO TO HOMEPAGE
            </button>
        </div>
    );
}

export default CreatedError;
