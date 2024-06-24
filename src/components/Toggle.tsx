import React from 'react';

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${checked ? 'bg-green-400' : 'bg-gray-300'}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : ''}`}
      />
    </div>
  );
};

export default Toggle;
