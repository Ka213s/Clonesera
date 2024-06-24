import React from 'react';
import { useNavigate } from 'react-router-dom';

const BecomeInstructor: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/become-instructor');
  };

  return (
    <div className="p-4 border rounded shadow-md mt-4 bg-white hidden md:block">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Become an Instructor</h2>
      <p className="text-gray-600 mb-4">
        Top instructors from around the world teach millions of students on Cursus. We provide the tools and skills to teach what you love.
      </p>
      <button 
        className="bg-[#9997F5] text-white font-bold py-2 px-4 rounded hover:bg-[#8886E5]"
        onClick={handleButtonClick}
      >
        Become Instructor
      </button>
    </div>
  );
};

export default BecomeInstructor;
