import React from 'react';

const FilterSection: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow mt-4 flex items-center justify-between">
      <input 
        type="text" 
        placeholder="Email" 
        className="px-4 py-2 border rounded-lg w-1/4" 
      />
      <input 
        type="text" 
        placeholder="Mobile" 
        className="px-4 py-2 border rounded-lg w-1/4 mx-4" 
      />
      <select className="px-4 py-2 border rounded-lg w-1/4">
        <option value="">Select Group</option>
        {/* Add options here */}
      </select>
      <button className="bg-purple-500 text-white px-4 py-2 rounded-lg mx-2">Filter</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Clear</button>
    </div>
  );
};

export default FilterSection;
