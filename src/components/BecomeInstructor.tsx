import React from 'react';

const BecomeInstructor: React.FC = () => {
  return (
    <div className="p-4 border rounded shadow-md mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Become an Instructor</h2>
      <p className="text-gray-600 mb-4">
        Top instructors from around the world teach millions of students on Cursus. We provide the tools and skills to teach what you love.
      </p>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
        Become Instructor
      </button>
    </div>
  );
};

export default BecomeInstructor;
