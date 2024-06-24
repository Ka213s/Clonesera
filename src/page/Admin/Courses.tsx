import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleRowClick = (id: number) => {
    navigate(`/admin/course/${id}`);
  };

  return (
   
      <div className="pt-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Courses</h1>
       
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Students</th>
                <th className="px-4 py-2">Lessons</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((course) => (
                <tr
                  key={course.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(course.id)}
                >
                  <td className="border px-4 py-2">
                    <img src={course.image} alt={course.title} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.instructor}</td>
                  <td className="border px-4 py-2">{course.rating}</td>
                  <td className="border px-4 py-2">{course.students}</td>
                  <td className="border px-4 py-2">{course.lessons}</td>
                  <td className="border px-4 py-2">{course.startDate}</td>
                  <td className="border px-4 py-2">{course.price}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md">
                      View all
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
   
  );
};

export default Courses;
