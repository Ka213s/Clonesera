import React from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptedError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-4">
                Accepted
            </h1>
            <p className="text-xl font-medium text-gray-800 mb-2">202 - ACCEPTED</p>
            <p className="text-lg text-gray-600 mb-8">
                The request has been accepted for processing, but the processing has not been completed.
            </p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-lg font-semibold text-white bg-purple-500 rounded-md hover:bg-purple-600"
            >
                GO TO HOMEPAGE
            </button>
        </div>
    );
}

export default AcceptedError;
