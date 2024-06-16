import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { Pagination } from 'antd';

const coursesData = [
  {
    id: 1,
    title: 'Master Your Personal Brand Like a Marketing',
    instructor: 'Darlene Robertson',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/path/to/course-image-1.png',
  },
  {
    id: 2,
    title: 'Data Science Real-Life Exercises Included',
    instructor: 'Kathryn Murphy',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/path/to/course-image-2.png',
  },
  {
    id: 3,
    title: 'Build Responsive Websites with HTML and CSS',
    instructor: 'Theresa Webb',
    rating: 5.0,
    students: 26,
    lessons: 12,
    startDate: '01-01-23',
    price: '$49.00',
    image: '/path/to/course-image-3.png',
  },
  // Add more course data as needed
];

const pageSize = 3; // Number of courses per page

const Courses: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();

  const handleChange = (page: number) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * pageSize;
  const currentPageData = coursesData.slice(startIndex, startIndex + pageSize);

  const handleCardClick = (id: number) => {
    navigate(`/admin/course/${id}`);
  };

  return (
    <MainLayout>
      <div className="pt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Courses</h1>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md">
            + Add New Course
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {currentPageData.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(course.id)}
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600">by {course.instructor}</p>
                <div className="flex items-center mt-2 mb-4">
                  <span className="text-yellow-500">⭐ {course.rating}</span>
                  <span className="ml-4 text-gray-500">Enroll {course.students}</span>
                  <span className="ml-4 text-gray-500">12 Lesson</span>
                  <span className="ml-4 text-gray-500">Start {course.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md">
                    View all
                  </button>
                  <span className="text-lg font-semibold text-purple-500">{course.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={coursesData.length}
            onChange={handleChange}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
