import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicCourses, getCurrentLogin } from '../utils/commonImports';
import { Tag } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

interface Course {
  _id: number;
  name: string;
  category_name: string;
  instructor_name: string;
  description: string;
  image_url: string;
  price_paid: number;
}

interface Instructor {
  id: number;
  name: string;
  avatar: string;
  coursesTaught: number;
}

interface User {
  name: string;
  avatar: string;
}

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = {
          searchCondition: {
            keyword: '',
            category_id: '',
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const response = await getPublicCourses(data);
        console.log('response:', response);
        setCourses(response.pageData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentLogin();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleViewDetails = (courseId: number) => {
    navigate(`/course-detail/${courseId}`);
  };

  const popularInstructors: Instructor[] = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://example.com/avatar1.jpg",
      coursesTaught: 10,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://example.com/avatar2.jpg",
      coursesTaught: 8,
    },
    // Add more instructors as needed
  ];

  const uniqueCategories = Array.from(new Set(courses.map(course => course.category_name)));

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2 relative bg-green-600 text-white p-6 rounded-lg mb-8 overflow-hidden flex items-center">
          <div className="z-10">
            <h1 className="text-4xl font-bold mb-4">Sharpen Your Skills with Professional Online Courses</h1>
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold inline-flex items-center">
              Join Now
              <svg
                className="ml-2 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.707-9.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l1.293-1.293V14a1 1 0 102 0V9.293l1.293 1.293a1 1 0 001.414-1.414l-3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-green-700 opacity-20"></div>
          <div className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden pointer-events-none">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Statistic</h2>
            {user && (
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold">Good Morning, {user.name} <span className="text-red-500">🔥</span></h3>
                  <p className="text-sm text-gray-600">Continue your learning to achieve your target!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex space-x-4 mb-8">
            {uniqueCategories.map(category => (
              <button key={category} className="bg-white shadow-md rounded-full px-4 py-2">
                {category}
              </button>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
            <div className="flex space-x-4 overflow-x-scroll pb-4">
              {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 flex flex-col">
                  <img src={course.image_url} alt={course.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2 h-16 overflow-hidden overflow-ellipsis">{course.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Category:</strong> <Tag color="blue">{course.category_name || 'Default Category'}</Tag>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Instructor:</strong> {course.instructor_name}
                    </p>
                    <p className="text-lg font-semibold text-green-600 mb-4">
                      <strong>Price:</strong> ${course.price_paid}
                    </p>
                    <button
                      onClick={() => handleViewDetails(course._id)}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mt-auto"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Popular Instructors</h2>
            <div className="flex space-x-4 overflow-x-scroll pb-4">
              {popularInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-lg shadow-lg overflow-hidden w-80 flex-shrink-0 flex flex-col">
                  <img src={instructor.avatar} alt={instructor.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{instructor.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Courses Taught:</strong> {instructor.coursesTaught}
                    </p>
                    <button
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300 mt-auto"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Sections */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <InfoCircleOutlined className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">About us</h2>
              <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <CheckCircleOutlined className="text-4xl text-green-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Certification</h2>
              <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
              <UserOutlined className="text-4xl text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Member</h2>
              <p className="text-gray-600 text-center">when an unknown printer took a galley of type and scrambled it</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
