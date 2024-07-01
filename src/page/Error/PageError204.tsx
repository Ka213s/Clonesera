import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoContentError: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-4">
                No Content
            </h1>
            <p className="text-xl font-medium text-gray-800 mb-2">204 - NO CONTENT</p>
            <p className="text-lg text-gray-600 mb-8">
                The server successfully processed the request and is not returning any content.
            </p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-lg font-semibold text-white bg-pink-500 rounded-md hover:bg-pink-600"
            >
                GO TO HOMEPAGE
            </button>
        </div>
    );
}

export default NoContentError;
