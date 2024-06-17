import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { Pagination } from 'antd';

const categoriesData = [
  {
    id: 1,
    name: 'Development',
    description: 'Courses related to software development and programming',
  },
  {
    id: 2,
    name: 'Business',
    description: 'Courses related to business management and entrepreneurship',
  },
  {
    id: 3,
    name: 'Design',
    description: 'Courses related to graphic design and UI/UX',
  },
];

const pageSize = 3;

const Category: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  const handleChange = (page: number) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * pageSize;
  const currentPageData = categoriesData.slice(startIndex, startIndex + pageSize);

  const handleCardClick = (id: number) => {
    navigate(`/admin/category-management/${id}`);
  };

  return (
    <MainLayout>
      <div className="pt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md">
            + Add New Category
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {currentPageData.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(category.id)}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={categoriesData.length}
            onChange={handleChange}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
