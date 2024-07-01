import React from 'react';
import img from '../../assets/Course.png';
import imgInstructor from '../../assets/Avatar03.jpg';

const pendingCoursesData = [
  {
    id: 1,
    title: 'Web Development with PHP & Laravel',
    instructor: 'Dewey Stephens',
    students: 26,
    lessons: 12,
    price: '$49.00',
    image: '/path/to/course-image-1.png',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'AWS Solutions Architect Associate Program',
    instructor: 'Dewey Stephens',
    students: 26,
    lessons: 12,
    price: '$49.00',
    image: '/path/to/course-image-2.png',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Starting SEO as your Home Based Business',
    instructor: 'Dewey Stephens',
    students: 26,
    lessons: 12,
    price: '$49.00',
    image: '/path/to/course-image-3.png',
    status: 'Pending',
  },
  // Add more course data as needed
];

const CoursesPending: React.FC = () => {
  return (
    <div className="pt-10 px-6">
      <h1 className="text-2xl font-semibold mb-6">Courses Pending</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Image</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Title</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Instructor</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Students</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Lessons</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Status</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Price</th>
            <th className="py-3 px-4 bg-gray-200 font-semibold text-sm text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingCoursesData.map((course) => (
            <tr key={course.id} className="border-t border-gray-200">
              <td className="py-3 px-4">
                <img src={img} alt={course.title} className="w-24 h-24 object-cover rounded-lg" />
              </td>
              <td className="py-3 px-4">
                <h2 className="text-lg font-semibold">{course.title}</h2>
              </td>
              <td className="py-3 px-4 flex items-center mt-9">
                <img src={imgInstructor} alt={course.instructor} className="w-6 h-6 rounded-full mr-2" />
                <span>{course.instructor}</span>
              </td>
              <td className="py-3 px-4">{course.students}</td>
              <td className="py-3 px-4">{course.lessons}</td>
              <td className="py-3 px-4">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{course.status}</span>
              </td>
              <td className="py-3 px-4 text-lg font-semibold text-purple-500">{course.price}</td>
              <td className="py-3 px-4">
                <div className="flex flex-col space-y-2">
                  <button className="bg-[#9997F5] hover:bg-[#8886E5] text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesPending;
