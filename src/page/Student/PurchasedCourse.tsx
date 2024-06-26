import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import coursesData from '../../models/FileJson/courses.json'; // Import courses data

interface Course {
  id: string;
  name: string;
  author: string;
  price: number;
  date: string;
  vid: string;
}

const PurchasedCourses: React.FC = () => {
  return (
    <div className="flex-grow flex flex-col p-6 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Purchased Courses</h1>
      <div className="space-y-4">
        {coursesData.courses.map((course: Course, index: number) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row w-full"
          >
            <Link
              to={`/purchasedCourse/${course.id}`} 
              className="w-full sm:w-48 h-40 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
            >
              <img
                src={course.vid} // Assuming vid contains the path to the image
                alt={course.name}
                className="w-full h-full object-cover rounded-md"
              />
            </Link>
            <div className="flex flex-col justify-between flex-grow">
              <div className="text-left">
                <h2 className="text-lg font-bold text-blue-500">
                  <Link
                    to={`/purchasedCourse/${course.id}`} 
                    className="hover:text-blue-700"
                  >
                    {course.name}
                  </Link>
                </h2>
                <p className="text-gray-600">Author: {course.author}</p>
                {/* Additional course details */}
                <p className="text-gray-600">Purchased Date: {course.date}</p>
              </div>
              <p className="text-gray-600 mt-4">Price: ${course.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCourses;
