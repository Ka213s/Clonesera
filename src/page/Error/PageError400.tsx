import React from 'react';
import { useNavigate } from 'react-router-dom';

const BadRequestError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
        Bad Request
      </h1>
      <p className="text-xl font-medium text-gray-800 mb-2">400 - INVALID REQUEST</p>
      <p className="text-lg text-gray-600 mb-8">
        The request could not be understood by the server due to malformed syntax. Please check your input and try again.
      </p>
      <button
        onClick={() => navigate('/home')}
        className="px-6 py-3 text-lg font-semibold text-white bg-[#F5A623] rounded-md hover:bg-orange-600"
      >
        GO TO HOMEPAGE
      </button>
    </div>
  );
}

export default BadRequestError;
