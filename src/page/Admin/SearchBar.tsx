import React from 'react';
import { FiSettings, FiBell } from 'react-icons/fi';

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <input 
        type="text" 
        placeholder="Search" 
        className="px-4 py-2 border rounded-lg w-1/2" 
      />
      <div className="flex items-center">
        <button className="mx-2">
          <FiSettings size={24} />
        </button>
        <button className="mx-2">
          <FiBell size={24} />
        </button>
        <img 
          src="../static/media/Avatar02.715a35cf5d30280dd60a.jpg" 
          alt="Profile" 
          className="w-10 h-10 rounded-full" 
        />
      </div>
    </div>
  );
};

export default SearchBar;
