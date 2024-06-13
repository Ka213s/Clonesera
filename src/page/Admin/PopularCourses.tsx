import React from 'react';

const PopularCourses: React.FC = () => {
  const coursesData = [
    {
      key: '1',
      name: 'Introduction of UI/UX',
      instructors: 'Esther Howard',
      amount: '$15',
      image: '/path/to/course/image1.png',
    },
    {
      key: '2',
      name: 'Introduction of UI/UX',
      instructors: 'Esther Howard',
      amount: '$15',
      image: '/path/to/course/image2.png',
    },
    {
      key: '3',
      name: 'Introduction of UI/UX',
      instructors: 'Esther Howard',
      amount: '$15',
      image: '/path/to/course/image3.png',
    },
    {
      key: '4',
      name: 'Introduction of UI/UX',
      instructors: 'Esther Howard',
      amount: '$15',
      image: '/path/to/course/image4.png',
    },
    {
      key: '5',
      name: 'Introduction of UI/UX',
      instructors: 'Esther Howard',
      amount: '$15',
      image: '/path/to/course/image5.png',
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Popular Courses</h2>
      {coursesData.map((course) => (
        <div key={course.key} className="flex items-center mb-4">
          <img
            src={course.image}
            alt="course"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="flex-1">
            <div className="font-bold">{course.name}</div>
            <div className="text-gray-600">{course.instructors}</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-500">{course.amount}</div>
            <div className="text-yellow-500 flex justify-end mt-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927C9.423 2.062 10.578 2.062 10.951 2.927L12.044 5.67C12.17 6.001 12.475 6.234 12.829 6.274L15.85 6.635C16.785 6.748 17.155 7.938 16.414 8.548L14.271 10.16C14.022 10.352 13.911 10.679 14.006 10.981L14.82 13.735C15.145 14.82 14.008 15.688 13.067 15.1L10.463 13.522C10.18 13.347 9.82 13.347 9.537 13.522L6.933 15.1C5.992 15.688 4.855 14.82 5.18 13.735L5.994 10.981C6.089 10.679 5.978 10.352 5.729 10.16L3.586 8.548C2.845 7.938 3.215 6.748 4.15 6.635L7.171 6.274C7.525 6.234 7.83 6.001 7.956 5.67L9.049 2.927z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularCourses;
