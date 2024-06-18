import React from 'react';

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
        <div className="space-y-6">
          {pendingCoursesData.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center">
                <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <span>Enroll {course.students}</span>
                    <span className="mx-2">•</span>
                    <span>{course.lessons} Lesson</span>
                    <span className="mx-2">•</span>
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{course.status}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <img src="/path/to/instructor-image.png" alt={course.instructor} className="w-6 h-6 rounded-full mr-2" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="text-lg font-semibold text-purple-500 mt-2">{course.price}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
 
  );
};

export default CoursesPending;
