import React from 'react';
import categoriesData from '../models/FileJson/categories.json';

const CategoryList: React.FC = () => {
  return (
    <div className="p-4 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Top Categories</h2>
      <ul className="list-disc list-inside text-gray-600">
        {categoriesData.categories.map((category, index) => (
          <li key={index} className="mb-2">{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
